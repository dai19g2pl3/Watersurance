package com.dai.watersurance.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.dai.watersurance.exception.ResourceNotFoundException;
import com.dai.watersurance.model.Habitation;
import com.dai.watersurance.model.User;
import com.dai.watersurance.payload.request.HabitationRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.projection.UserIdHabitation;
import com.dai.watersurance.repository.HabitationRepository;
import com.dai.watersurance.repository.UserRepository;
import com.dai.watersurance.security.CurrentUser;
import com.dai.watersurance.security.UserPrincipal;

@Service
public class HabitationService {

	@Autowired
	private HabitationRepository habitationRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public ResponseEntity<List<Habitation>> getMyHabitations(@CurrentUser UserPrincipal currentUser) {
		List<Habitation> habitations = habitationRepository.findHabitationByUserId(currentUser.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Habitation", "User id", currentUser.getId()));
				
		return ResponseEntity.ok().body(habitations);
	}
	
	public ResponseEntity<List<UserIdHabitation>> getHabitations() {
		List<UserIdHabitation> habitations = habitationRepository.findAllByOrderByIdAsc(UserIdHabitation.class);
		
		return ResponseEntity.ok().body(habitations);
	}
	
	public ResponseEntity<UserIdHabitation> getHabitation(@PathVariable(value = "id") long id) {
		UserIdHabitation habitation = habitationRepository.findById(id, UserIdHabitation.class)
				.orElseThrow(() -> new ResourceNotFoundException("Habitation", "id", id));
		
		return ResponseEntity.ok().body(habitation);
	}
	
	public ResponseEntity<ApiResponse> registerHabitation(@PathVariable(value = "id") long id, 
    		@Valid @RequestBody HabitationRequest habitationRequest) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
		
		Habitation habitation = new Habitation(habitationRequest.getAddress(), habitationRequest.getZipCode(),
				habitationRequest.getSensorQtd(), user);
		
		habitationRepository.save(habitation);
		
		return ResponseEntity.ok().body(new ApiResponse(true, "Habitation registered successfully"));
	}
	
	public ResponseEntity<ApiResponse> updateHabitation(@PathVariable(value = "id") long id, 
			@Valid @RequestBody HabitationRequest habitationRequest) {
		Habitation habitation = habitationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Habitation", "id", id));
		
		habitation.setAddress(habitationRequest.getAddress());
		habitation.setZipCode(habitationRequest.getZipCode());
		habitation.setSensorQtd(habitationRequest.getSensorQtd());
		habitationRepository.save(habitation);
		
		return ResponseEntity.ok().body(new ApiResponse(true, "Habitation updated successfully"));
	}
	
	public ResponseEntity<ApiResponse> deleteHabitation(@PathVariable(value = "id") long id) {
		Habitation habitation = habitationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Habitation", "id", id));		
		
		habitationRepository.delete(habitation);
		
		return ResponseEntity.ok().body(new ApiResponse(true, "Habitation deleted successfully"));
	}
}
