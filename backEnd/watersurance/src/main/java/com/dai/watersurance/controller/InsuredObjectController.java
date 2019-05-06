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

import com.dai.watersurance.model.InsuredObject;
import com.dai.watersurance.payload.request.InsuredObjectRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.service.InsuredObjectService;

@RestController
@RequestMapping("/api")
public class InsuredObjectController {

	@Autowired
	private InsuredObjectService insuredObjectService;
	
	/*
	@GetMapping("/habitation/me")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<List<Habitation>> getInsuredObjectService(@CurrentUser UserPrincipal currentUser) {
		return insuredObjectService.getInsuredObjectService(currentUser);
	}
	
	
	@GetMapping("/habitations")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER')")
	public ResponseEntity<List<UserIdHabitation>> getHabitations() {
		return habitationService.getHabitations();
	}
	*/
	
	@GetMapping("/insuredObject/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER')")
	public ResponseEntity<InsuredObject> getInsuredObject(@PathVariable(value = "id") long id) {
		return insuredObjectService.getInsuredObject(id);
	}
	
	@PostMapping("/insuredObject/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER')")
	public ResponseEntity<ApiResponse> registerInsuredObject(@PathVariable(value = "id") long id,
			@Valid @RequestBody InsuredObjectRequest insuredObjectRequest) {
		return insuredObjectService.registerInsuredObject(id, insuredObjectRequest);
	}
	
	@PutMapping("/insuredObject/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER')")
	public ResponseEntity<ApiResponse> updateInsuredObject(@PathVariable(value = "id") long id, 
			@Valid @RequestBody InsuredObjectRequest insuredObjectRequest) {
		return insuredObjectService.updateInsuredObject(id, insuredObjectRequest);
	}
	
	@DeleteMapping("/insuredObject/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER')")
	public ResponseEntity<ApiResponse> deleteInsuredObject(@PathVariable(value = "id") long id) {
		return insuredObjectService.deleteInsuredObject(id);
	}	
}
