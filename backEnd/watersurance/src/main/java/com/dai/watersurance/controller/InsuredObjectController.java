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
import com.dai.watersurance.payload.request.PostInsuredObjectRequest;
import com.dai.watersurance.payload.request.UpdateInsuredObjectRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.security.CurrentUser;
import com.dai.watersurance.security.UserPrincipal;
import com.dai.watersurance.service.InsuredObjectService;

@RestController
@RequestMapping("/api")
public class InsuredObjectController {

	@Autowired
	private InsuredObjectService insuredObjectService;
	
	//Get insured object by it's id
	@GetMapping("/insuredObject/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER')")
	public ResponseEntity<InsuredObject> getInsuredObject(@PathVariable(value = "id") long id) {
		return insuredObjectService.getInsuredObject(id);
	}
	
	//Get insured object by it's id of logged user
	@GetMapping("/my/insuredObject/{id}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> getMyInsuredObject(@PathVariable(value = "id") long id,
			@CurrentUser UserPrincipal currentUser) {
		return insuredObjectService.getMyInsuredObject(id, currentUser);
	}
	
	//Post insured object by habitation id
	@PostMapping("/insuredObject/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER')")
	public ResponseEntity<ApiResponse> registerInsuredObject(@PathVariable(value = "id") long id,
			@Valid @RequestBody PostInsuredObjectRequest postInsuredObjectRequest) {
		return insuredObjectService.registerInsuredObject(id, postInsuredObjectRequest);
	}
	
	//Put insured object by it's id
	@PutMapping("/insuredObject/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER')")
	public ResponseEntity<ApiResponse> updateInsuredObject(@PathVariable(value = "id") long id, 
			@Valid @RequestBody UpdateInsuredObjectRequest updateInsuredObjectRequest) {
		return insuredObjectService.updateInsuredObject(id, updateInsuredObjectRequest);
	}
	
	//Delete insured object by it's id
	@DeleteMapping("/insuredObject/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER')")
	public ResponseEntity<ApiResponse> deleteInsuredObject(@PathVariable(value = "id") long id) {
		return insuredObjectService.deleteInsuredObject(id);
	}	
}
