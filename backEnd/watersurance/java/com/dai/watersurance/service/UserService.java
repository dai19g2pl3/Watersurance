package com.dai.watersurance.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.dai.watersurance.exception.AppException;
import com.dai.watersurance.exception.ResourceNotFoundException;
import com.dai.watersurance.model.Insurer;
import com.dai.watersurance.model.Role;
import com.dai.watersurance.model.RoleName;
import com.dai.watersurance.model.User;
import com.dai.watersurance.payload.request.PostAdminRequest;
import com.dai.watersurance.payload.request.PostUserOrInsurerRequest;
import com.dai.watersurance.payload.request.UpdateAdminRequest;
import com.dai.watersurance.payload.request.UpdateUserOrInsurerRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.payload.response.UserIdentityAvailability;
import com.dai.watersurance.payload.response.UserSummary;
import com.dai.watersurance.projection.NoPwdUser;
import com.dai.watersurance.repository.InsurerRepository;
import com.dai.watersurance.repository.RoleRepository;
import com.dai.watersurance.repository.UserRepository;
import com.dai.watersurance.security.CurrentUser;
import com.dai.watersurance.security.UserPrincipal;

@Service
public class UserService {
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private InsurerRepository insurerRepository;
	
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getEmail(), currentUser.getName());
        return userSummary;
    }

    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }
    
    public ResponseEntity<List<NoPwdUser>> getUsers() {
    	List<NoPwdUser> users = userRepository.findAllByOrderByIdAsc(NoPwdUser.class);
    	
    	return ResponseEntity.ok(users);
    }
    
    public ResponseEntity<NoPwdUser> getUser(@PathVariable(value = "id") long id) {
    	NoPwdUser user = userRepository.findById(id, NoPwdUser.class)
    			.orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    	
    	return ResponseEntity.ok(user);
    }
    
    public ResponseEntity<ApiResponse> registerAdmin(@Valid @RequestBody PostAdminRequest postAdminRequest) {
    	if(userRepository.existsByEmail(postAdminRequest.getEmail())) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
    	
    	// Creating user's account
        User user = new User(postAdminRequest.getName(), postAdminRequest.getEmail(),
        		postAdminRequest.getPassword(), postAdminRequest.getNif(), postAdminRequest.getPhoneNumber(),
        		true, null);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
    	
        Role userRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
        		.orElseThrow(() -> new AppException("Admin role not set."));
        
        Set<Role> role = new HashSet<Role>();
    	role.add(userRole);
    	user.setRoles(role);
    	userRepository.save(user);
    	
    	return ResponseEntity.ok().body(new ApiResponse(true, "Admin registered successfully"));
    }
    
    public ResponseEntity<ApiResponse> registerUserOrInsurer(@Valid @RequestBody PostUserOrInsurerRequest postUserOrInsurerRequest) {
    	if(userRepository.existsByEmail(postUserOrInsurerRequest.getEmail())) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
    	
    	Insurer insurer = insurerRepository.findByName(postUserOrInsurerRequest.getInsurer())
    			.orElseThrow(() -> new ResourceNotFoundException("Insurer", "name", postUserOrInsurerRequest.getInsurer()));
    	
    	// Creating user's account
        User user = new User(postUserOrInsurerRequest.getName(), postUserOrInsurerRequest.getEmail(),
        		postUserOrInsurerRequest.getPassword(), postUserOrInsurerRequest.getNif(), postUserOrInsurerRequest.getPhoneNumber(),
        		postUserOrInsurerRequest.getIsActive(), null);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
    	
        Role userRole;
        switch(postUserOrInsurerRequest.getRole()) {
    	case "ROLE_USER":
    		userRole = roleRepository.findByName(RoleName.ROLE_USER)
    		.orElseThrow(() -> new AppException("User role not set.")); break;
    	case "ROLE_INSURER":
    		userRole = roleRepository.findByName(RoleName.ROLE_INSURER)
    		.orElseThrow(() -> new AppException("Insurer role not set.")); break;
    	default:
    		userRole = roleRepository.findByName(RoleName.ROLE_USER)
    		.orElseThrow(() -> new AppException("Insurer role not set.")); break;
    	}
    	
    	Set<Role> role = new HashSet<Role>();
    	role.add(userRole);
    	user.setRoles(role);
    	user.setInsurer(insurer);
    	userRepository.save(user);
    	
    	return ResponseEntity.ok().body(new ApiResponse(true, "User registered successfully"));
    }
    
    public ResponseEntity<ApiResponse> updateAdmin(@PathVariable(value = "id") long id, 
    		@Valid @RequestBody UpdateAdminRequest updateAdminRequest) {        
    	User user = userRepository.findById(id)
    			.orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    	
    	Insurer insurer = insurerRepository.findByName(updateAdminRequest.getInsurer())
    			.orElseThrow(() -> new ResourceNotFoundException("Insurer", "name", updateAdminRequest.getInsurer()));
    	
    	Role userRole;
    	
    	switch(updateAdminRequest.getRole()) {
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
    	
    	Set<Role> role = new HashSet<Role>();
    	role.add(userRole);
    	user.setRoles(role);
    	user.setName(updateAdminRequest.getName());
    	user.setEmail(updateAdminRequest.getEmail());
    	user.setNif(updateAdminRequest.getNif());
    	user.setPhoneNumber(updateAdminRequest.getPhoneNumber());
    	user.setIsActive(updateAdminRequest.getIsActive());
    	user.setInsurer(insurer);
    	
    	userRepository.save(user);
        return ResponseEntity.ok().body(new ApiResponse(true, "User updated successfully"));
    }

    public ResponseEntity<ApiResponse> updateUserOrInsurer(@PathVariable(value = "id") long id, 
    		@Valid @RequestBody UpdateUserOrInsurerRequest updateUserOrInsurerRequest) {        
    	User user = userRepository.findById(id)
    			.orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    	
    	Insurer insurer = insurerRepository.findByName(updateUserOrInsurerRequest.getInsurer())
    			.orElseThrow(() -> new ResourceNotFoundException("Insurer", "name", updateUserOrInsurerRequest.getInsurer()));
    	
    	Role userRole;
    	
    	switch(updateUserOrInsurerRequest.getRole()) {
    	case "ROLE_USER":
    		userRole = roleRepository.findByName(RoleName.ROLE_USER)
    		.orElseThrow(() -> new AppException("User role not set.")); break;
    	case "ROLE_INSURER":
    		userRole = roleRepository.findByName(RoleName.ROLE_INSURER)
    		.orElseThrow(() -> new AppException("Insurer role not set.")); break;
    	default:
    		userRole = roleRepository.findByName(RoleName.ROLE_USER)
    		.orElseThrow(() -> new AppException("Insurer role not set.")); break;
    	}
    	
    	Set<Role> role = new HashSet<Role>();
    	role.add(userRole);
    	user.setRoles(role);
    	user.setName(updateUserOrInsurerRequest.getName());
    	user.setEmail(updateUserOrInsurerRequest.getEmail());
    	user.setNif(updateUserOrInsurerRequest.getNif());
    	user.setPhoneNumber(updateUserOrInsurerRequest.getPhoneNumber());
    	user.setIsActive(updateUserOrInsurerRequest.getIsActive());
    	user.setInsurer(insurer);
    	
    	userRepository.save(user);
        return ResponseEntity.ok().body(new ApiResponse(true, "User updated successfully"));
    }

    public ResponseEntity<ApiResponse> deleteAdmin(@PathVariable(value = "id") long id) {
    	User user = userRepository.findById(id)
    			.orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    	
    	Set<Role> role = user.getRoles();
    	
    	for(Role userRole: role) {
    		if(userRole.getName() == RoleName.ROLE_ADMIN) {
    			userRepository.delete(user);
    			
    			return ResponseEntity.ok().body(new ApiResponse(true, "User deleted successfully"));
    		}
    	}
    	
    	return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Failed to delete User"), 
    			HttpStatus.BAD_REQUEST);
    }
        
    public ResponseEntity<ApiResponse> deleteUserOrInsurer(@PathVariable(value = "id") long id) {
    	User user = userRepository.findById(id)
    			.orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    	
    	Set<Role> role = user.getRoles();
    	
    	for(Role userRole: role) {
    		if(userRole.getName() == RoleName.ROLE_ADMIN) {
    			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Failed to delete User"),
                        HttpStatus.UNAUTHORIZED);
    		}
    	}
    	
    	userRepository.delete(user);
    	
    	return ResponseEntity.ok().body(new ApiResponse(true, "User deleted successfully"));
    }
}
