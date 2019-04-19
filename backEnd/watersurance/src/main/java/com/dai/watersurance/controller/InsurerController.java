package com.dai.watersurance.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.dai.watersurance.exception.ResourceNotFoundException;
import com.dai.watersurance.model.Insurer;
import com.dai.watersurance.payload.request.SetInsurerRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.payload.response.InsurerIdentityAvailability;
import com.dai.watersurance.repository.InsurerRepository;

@RestController
@RequestMapping("/api")
public class InsurerController {

	@Autowired
    private InsurerRepository insurerRepository;
	
	@SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(InsurerController.class);
	
	@GetMapping("/insurer/checkNameAvailability")
    public InsurerIdentityAvailability checkNameAvailability(@RequestParam(value = "name") String name) {
        Boolean isAvailable = !insurerRepository.existsByName(name);
        
        return new InsurerIdentityAvailability(isAvailable);
    }
	
	@PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/insurers")
    public ResponseEntity<List<Insurer>> getInsurers() {
    	List<Insurer> insurers = insurerRepository.findAll();
    	
    	return ResponseEntity.ok(insurers);
    }
	
	@PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/insurer/{id}")
    public ResponseEntity<Insurer> getInsurer(@PathVariable(value = "id") long id) {
    	Insurer insurer = insurerRepository.findById(id)
    			.orElseThrow(() -> new ResourceNotFoundException("Insurer", "id", id));
    	
    	return ResponseEntity.ok(insurer);
    }
	
	@PostMapping("/insurer")
    public ResponseEntity<ApiResponse> registerInsurer(@Valid @RequestBody SetInsurerRequest setInsurerRequest) {        
		
		if(insurerRepository.existsByName(setInsurerRequest.getName())) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Name already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
    	
		//Creating Insurer
		Insurer insurer = new Insurer(setInsurerRequest.getName());
		insurerRepository.save(insurer);
		
        return ResponseEntity.ok().body(new ApiResponse(true, "Insurance registered successfully"));
    }
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/insurer/{id}")
	public ResponseEntity<ApiResponse> updateInsurer(@PathVariable(value = "id") long id, 
    		@Valid @RequestBody SetInsurerRequest setInsurerRequest) {        
		
		if(insurerRepository.existsByName(setInsurerRequest.getName())) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Name already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
    	
		Insurer insurer = insurerRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Insurer", "id", id));
		
		insurer.setName(setInsurerRequest.getName());
		insurerRepository.save(insurer);
		
        return ResponseEntity.ok().body(new ApiResponse(true, "Insurance updated successfully"));
    }
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/insurer/{id}")
	public ResponseEntity<ApiResponse> deleteInsurer(@PathVariable(value = "id") long id) {        

		Insurer insurer = insurerRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Insurer", "id", id));
		
		insurerRepository.delete(insurer);
		
        return ResponseEntity.ok().body(new ApiResponse(true, "Insurance deleted successfully"));
    }
}
