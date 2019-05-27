package com.dai.watersurance.controller;

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

import com.dai.watersurance.model.Occurrence;
import com.dai.watersurance.payload.request.PostOccurrenceRequest;
import com.dai.watersurance.payload.request.UpdateOccurrenceRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.security.CurrentUser;
import com.dai.watersurance.security.UserPrincipal;
import com.dai.watersurance.service.OccurrenceService;

@RestController
@RequestMapping("/api")
public class OccurrenceController {

	@Autowired
	private OccurrenceService occurrenceService;
	
	//Get occurrence by it's id
	@GetMapping("/occurrence/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER')")
	public ResponseEntity<Occurrence> getOccurrence(@PathVariable(value = "id") long id) {
		return occurrenceService.getOccurrence(id);
	}
	
	//Get occurrence by it's id of logged user
	@GetMapping("/my/occurrence/{id}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> getMyOccurrence(@PathVariable(value = "id") long id,
			@CurrentUser UserPrincipal currentUser) {
		return occurrenceService.getMyOccurrence(id, currentUser);
	}
	
	//Post occurrence by habitation id
	@PostMapping("/occurrence/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER') or hasRole('USER')")
	public ResponseEntity<ApiResponse> registerOccurrence(@PathVariable(value = "id") long id,
			@Valid @RequestBody PostOccurrenceRequest postOccurrenceRequest) {
		return occurrenceService.registerOccurrence(id, postOccurrenceRequest);
	}
	
	//Put occurrence by it's id
	@PutMapping("/occurrence/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER') or hasRole('USER')")
	public ResponseEntity<ApiResponse> updateOccurrence(@PathVariable(value = "id") long id, 
			@Valid @RequestBody UpdateOccurrenceRequest updateOccurrenceRequest) {
		return occurrenceService.updateOccurrence(id, updateOccurrenceRequest);
	}
	
	//Delete occurrence by it's id
	@DeleteMapping("/occurrence/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER')")
	public ResponseEntity<ApiResponse> deleteOccurrence(@PathVariable(value = "id") long id) {
		return occurrenceService.deleteOccurrence(id);
	}	
}
