package com.dai.watersurance.controller;

import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.payload.response.UserIdentityAvailability;
import com.dai.watersurance.payload.response.UserSummary;
import com.dai.watersurance.payload.request.PostAdminRequest;
import com.dai.watersurance.payload.request.PostUserOrInsurerRequest;
import com.dai.watersurance.payload.request.UpdateAdminRequest;
import com.dai.watersurance.payload.request.UpdateUserOrInsurerRequest;
import com.dai.watersurance.projection.NoPwdUser;
import com.dai.watersurance.security.UserPrincipal;
import com.dai.watersurance.service.UserService;
import com.dai.watersurance.security.CurrentUser;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
    
    @Autowired
    private UserService userService;

    @SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PreAuthorize("hasRole('USER') or hasRole('INSURER') or hasRole('ADMIN')")
    @GetMapping("/user/me")    
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        return userService.getCurrentUser(currentUser);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        return userService.checkEmailAvailability(email);
    }
    
    @PreAuthorize("hasRole('INSURER') or hasRole('ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<List<NoPwdUser>> getUsers() {
    	return userService.getUsers();
    }
    
    @PreAuthorize("hasRole('INSURER') or hasRole('ADMIN')")
    @GetMapping("/user/{id}")
    public ResponseEntity<NoPwdUser> getUser(@PathVariable(value = "id") long id) {
    	return userService.getUser(id);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin")
    public ResponseEntity<ApiResponse> registerAdmin(@Valid @RequestBody PostAdminRequest postAdminRequest) {
    	return userService.registerAdmin(postAdminRequest);
    }
    
    @PreAuthorize("hasRole('INSURER') or hasRole('ADMIN')")
    @PostMapping("/user")
    public ResponseEntity<ApiResponse> registerUserOrInsurer(@Valid @RequestBody PostUserOrInsurerRequest postUserOrInsurerRequest) {
    	return userService.registerUserOrInsurer(postUserOrInsurerRequest);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/{id}")
    public ResponseEntity<ApiResponse> updateAdmin(@PathVariable(value = "id") long id, 
    		@Valid @RequestBody UpdateAdminRequest updateUserRequest) {        
    	return userService.updateAdmin(id, updateUserRequest);
    }
    
    @PreAuthorize("hasRole('INSURER') or hasRole('ADMIN')")
    @PutMapping("/user/{id}")
    public ResponseEntity<ApiResponse> updateUserOrInsurer(@PathVariable(value = "id") long id, 
    		@Valid @RequestBody UpdateUserOrInsurerRequest updateUserOrInsurerRequest) {        
    	return userService.updateUserOrInsurer(id, updateUserOrInsurerRequest);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<ApiResponse> deleteAdmin(@PathVariable(value = "id") long id) {
    	return userService.deleteAdmin(id);
    }
    
    @PreAuthorize("hasRole('INSURER') or hasRole('ADMIN')")
    @DeleteMapping("/user/{id}")
    public ResponseEntity<ApiResponse> deleteUserOrInsurer(@PathVariable(value = "id") long id) {
    	return userService.deleteUserOrInsurer(id);
    }
}