package com.dai.watersurance.controller;

import com.dai.watersurance.exception.ResourceNotFoundException;
import com.dai.watersurance.model.Insurer;
import com.dai.watersurance.model.User;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.payload.response.UserIdentityAvailability;
import com.dai.watersurance.payload.response.UserSummary;
import com.dai.watersurance.payload.request.SetInsurerRequest;
import com.dai.watersurance.projection.NoPwdUser;
import com.dai.watersurance.repository.InsurerRepository;
import com.dai.watersurance.repository.UserRepository;
import com.dai.watersurance.security.UserPrincipal;
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
    private UserRepository userRepository;
    
    @Autowired
    private InsurerRepository insurerRepository;

    @SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER') or hasRole('INSURER') or hasRole('ADMIN')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getEmail(), currentUser.getName());
        return userSummary;
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }
    
    //Warning: It's returning passwords!!
    @PreAuthorize("hasRole('INSURER') or hasRole('ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
    	List<User> users = userRepository.findAll();
    	
    	return ResponseEntity.ok(users);
    }
    
    @PreAuthorize("hasRole('INSURER') or hasRole('ADMIN')")
    @GetMapping("/user/{id}")
    public ResponseEntity<NoPwdUser> getUser(@PathVariable(value = "id") long id) {
    	NoPwdUser user = userRepository.findById(id, NoPwdUser.class)
    			.orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    	
    	return ResponseEntity.ok(user);
    }
    
    @PutMapping("/user/setInsurer/{id}")
    public ResponseEntity<ApiResponse> setUserInsurer(@PathVariable(value = "id") long id, @Valid @RequestBody SetInsurerRequest setInsurerRequest) {        
    	User user = userRepository.findById(id)
    			.orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    	
    	Insurer insurer = insurerRepository.findByName(setInsurerRequest.getName())
    			.orElseThrow(() -> new ResourceNotFoundException("Insurer", "name", setInsurerRequest.getName()));  
    	
    	user.setInsurer(insurer);
    	userRepository.save(user);
    	
        return ResponseEntity.ok().body(new ApiResponse(true, "User insurance changed successfully"));
    }
    
    
}