package com.dai.watersurance.controller;

import com.dai.watersurance.exception.AppException;
import com.dai.watersurance.exception.ResourceNotFoundException;
import com.dai.watersurance.model.Role;
import com.dai.watersurance.model.RoleName;
import com.dai.watersurance.model.User;
import com.dai.watersurance.payload.request.LoginRequest;
import com.dai.watersurance.payload.request.SignUpRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.repository.RoleRepository;
import com.dai.watersurance.repository.UserRepository;
import com.dai.watersurance.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URI;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        
        User user = userRepository.findByEmail(loginRequest.getEmail())
        		.orElseThrow(() -> new ResourceNotFoundException("User", "email", loginRequest.getEmail()));
        
        
        Date today = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String strDate = dateFormat.format(today);
        try {
			Date date = dateFormat.parse(strDate);
			user.setLastLogin(date);
		} catch (ParseException e) {
			return new ResponseEntity<Object>(new ApiResponse(false, "Failed to parse Date"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
		} 
        
        userRepository.save(user);
        
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        
        Cookie cookie = new Cookie("token", jwt);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setDomain("localhost");
        response.addCookie(cookie);
        
        return ResponseEntity.ok(new ApiResponse(true, "User logged in successfully"));
    }
    
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getEmail(),
        		signUpRequest.getPassword(), signUpRequest.getNif(), signUpRequest.getPhoneNumber(), false, null);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        Role userRole;
        
        switch(signUpRequest.getRole()) {
        	case "ROLE_USER":
        		userRole = roleRepository.findByName(RoleName.ROLE_USER)
        		.orElseThrow(() -> new AppException("User role not set.")); break;
        	case "ROLE_INSURER":
        		userRole = roleRepository.findByName(RoleName.ROLE_INSURER)
        		.orElseThrow(() -> new AppException("Insurer role not set.")); break;
        	case "ROLE_ADMIN":
        		userRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
        		.orElseThrow(() -> new AppException("Admin role not set.")); break;
        	default:
        		userRole = roleRepository.findByName(RoleName.ROLE_USER)
        		.orElseThrow(() -> new AppException("Insurer role not set.")); break;
        }

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{email}")
                .buildAndExpand(result.getEmail()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
    
    
}