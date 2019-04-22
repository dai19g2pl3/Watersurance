package com.dai.watersurance.controller;

import com.dai.watersurance.payload.request.LoginRequest;
import com.dai.watersurance.payload.request.SignUpRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PreAuthorize("isAnonymous()")
    @PostMapping("/signin")
    public ResponseEntity<ApiResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        return authService.authenticateUser(loginRequest, response);
    }
    
    @PreAuthorize("isAnonymous()")
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        return authService.registerUser(signUpRequest);
    }
    
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/logout")
    public ResponseEntity<ApiResponse> logoutUser(HttpServletRequest request, HttpServletResponse response) {
    	return authService.logoutUser(request, response);
    }
       
}