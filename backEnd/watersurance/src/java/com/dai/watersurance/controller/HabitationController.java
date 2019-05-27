package com.dai.watersurance.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dai.watersurance.model.Habitation;
import com.dai.watersurance.payload.request.HabitationRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.projection.UserIdHabitation;
import com.dai.watersurance.security.CurrentUser;
import com.dai.watersurance.security.UserPrincipal;
import com.dai.watersurance.service.HabitationService;

@RestController
@RequestMapping("/api")
public class HabitationController {

	@Autowired
	private HabitationService habitationService;
	
	@GetMapping("/my/habitations")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<List<Habitation>> getMyHabitations(@CurrentUser UserPrincipal currentUser) {
		return habitationService.getMyHabitations(currentUser);
	}
	
	@GetMapping("/habitations")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER')")
	public ResponseEntity<List<UserIdHabitation>> getHabitations() {
		return habitationService.getHabitations();
	}
	
	@GetMapping("/habitation/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER')")
	public ResponseEntity<UserIdHabitation> getHabitation(@PathVariable(value = "id") long id) {
		return habitationService.getHabitation(id);
	}
	
	@PostMapping("/habitation/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER')")
	public ResponseEntity<ApiResponse> registerHabitation(@PathVariable(value = "id") long id,
			@Valid @RequestBody HabitationRequest habitationRequest) {
		return habitationService.registerHabitation(id, habitationRequest);
	}
	
	@PutMapping("/habitation/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER')")
	public ResponseEntity<ApiResponse> updateHabitation(@PathVariable(value = "id") long id, 
			@Valid @RequestBody HabitationRequest habitationRequest) {
		return habitationService.updateHabitation(id, habitationRequest);
	}
	
	@DeleteMapping("/habitation/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER')")
	public ResponseEntity<ApiResponse> deleteHabitation(@PathVariable(value = "id") long id) {
		return habitationService.deleteHabitation(id);
	}	
	
}
