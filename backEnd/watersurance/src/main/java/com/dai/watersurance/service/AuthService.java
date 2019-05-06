package com.dai.watersurance.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.dai.watersurance.exception.AppException;
import com.dai.watersurance.exception.ResourceNotFoundException;
import com.dai.watersurance.model.Role;
import com.dai.watersurance.model.RoleName;
import com.dai.watersurance.model.User;
import com.dai.watersurance.payload.request.LoginRequest;
import com.dai.watersurance.payload.request.SignUpRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.payload.response.JwtAuthenticationResponse;
import com.dai.watersurance.repository.RoleRepository;
import com.dai.watersurance.repository.UserRepository;
import com.dai.watersurance.security.JwtTokenProvider;
import com.dai.watersurance.util.CookieUtils;

@Service
public class AuthService {

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

	public ResponseEntity<?> authenticateJustUser(@Valid @RequestBody LoginRequest loginRequest,
			HttpServletResponse response) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		User user = userRepository.findByEmail(loginRequest.getEmail())
				.orElseThrow(() -> new ResourceNotFoundException("User", "email", loginRequest.getEmail()));

		Set<Role> roles = user.getRoles();
		Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
				.orElseThrow(() -> new AppException("User role not set."));

		if(!isUser(roles, userRole)) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "You're not a User"),
					HttpStatus.FORBIDDEN);
		}

		Date today = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String strDate = dateFormat.format(today);
		try {
			Date date = dateFormat.parse(strDate);
			user.setLastLogin(date);
		} catch (ParseException e) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Failed to parse Date"),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		userRepository.save(user);

		SecurityContextHolder.getContext().setAuthentication(authentication);

		//CookieUtils.addCookie(response, "token", jwt, 604800000);
		String jwt = tokenProvider.generateToken(authentication); 	
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
	}

	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,
			HttpServletResponse response) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		User user = userRepository.findByEmail(loginRequest.getEmail())
				.orElseThrow(() -> new ResourceNotFoundException("User", "email", loginRequest.getEmail()));

		Date today = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String strDate = dateFormat.format(today);
		try {
			Date date = dateFormat.parse(strDate);
			user.setLastLogin(date);
		} catch (ParseException e) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Failed to parse Date"),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		userRepository.save(user);

		SecurityContextHolder.getContext().setAuthentication(authentication);

		//CookieUtils.addCookie(response, "token", jwt, 604800000);
		String jwt = tokenProvider.generateToken(authentication);
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
	}

	public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Email Address already in use!"),
					HttpStatus.BAD_REQUEST);
		}

		// Creating user's account
		User user = new User(signUpRequest.getName(), signUpRequest.getEmail(), signUpRequest.getPassword(),
				signUpRequest.getNif(), signUpRequest.getPhoneNumber(), false, null);

		user.setPassword(passwordEncoder.encode(user.getPassword()));

		Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
				.orElseThrow(() -> new AppException("User role not set."));

		Set<Role> role = new HashSet<Role>();
		role.add(userRole);
		user.setRoles(role);

		userRepository.save(user);

		return ResponseEntity.ok().body(new ApiResponse(true, "User registered successfully"));
	}

	public ResponseEntity<ApiResponse> logoutUser(HttpServletRequest request, HttpServletResponse response) {
		Boolean isOK = CookieUtils.deleteCookie(request, response, "token");

		if (isOK == true) {
			return ResponseEntity.ok().body(new ApiResponse(true, "User logged out successfully"));
		}

		return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Must be logged in to logout"),
				HttpStatus.PRECONDITION_FAILED);
	}

	private boolean isUser(Set<Role> roles, Role userRole) {
		boolean isUser = false;

		for (Role role : roles) {
			if (role.equals(userRole)) {
				isUser = true;
			}
		}
		
		return isUser;
	}
}
