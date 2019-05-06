package com.dai.watersurance.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dai.watersurance.model.Insurer;
import com.dai.watersurance.payload.request.SetInsurerRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.payload.response.InsurerIdentityAvailability;
import com.dai.watersurance.service.InsurerService;

@RestController
@RequestMapping("/api")
public class InsurerController {
	
	@Autowired
	private InsurerService insurerService;
	
	@SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(InsurerController.class);
	
	@GetMapping("/insurer/checkNameAvailability")
    public InsurerIdentityAvailability checkNameAvailability(@RequestParam(value = "name") String name) {
        return insurerService.checkNameAvailability(name);
    }
	
	@PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/insurers")
    public ResponseEntity<List<Insurer>> getInsurers() {
    	return insurerService.getInsurers();
    }
	
	@PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/insurer/{id}")
    public ResponseEntity<Insurer> getInsurer(@PathVariable(value = "id") long id) {
    	return insurerService.getInsurer(id);
    }
	
	@PostMapping("/insurer")
    public ResponseEntity<ApiResponse> registerInsurer(@Valid @RequestBody SetInsurerRequest setInsurerRequest) {        
        return insurerService.registerInsurer(setInsurerRequest);
    }
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/insurer/{id}")
	public ResponseEntity<ApiResponse> updateInsurer(@PathVariable(value = "id") long id, 
    		@Valid @RequestBody SetInsurerRequest setInsurerRequest) {        
		
        return insurerService.updateInsurer(id, setInsurerRequest);
    }
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/insurer/{id}")
	public ResponseEntity<ApiResponse> deleteInsurer(@PathVariable(value = "id") long id) {        
		return insurerService.deleteInsurer(id);
    }
}
