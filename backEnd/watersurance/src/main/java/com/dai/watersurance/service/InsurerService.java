package com.dai.watersurance.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.dai.watersurance.exception.ResourceNotFoundException;
import com.dai.watersurance.model.Insurer;
import com.dai.watersurance.payload.request.SetInsurerRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.payload.response.InsurerIdentityAvailability;
import com.dai.watersurance.repository.InsurerRepository;

@Service
public class InsurerService {

	@Autowired
    private InsurerRepository insurerRepository;
	
	public InsurerIdentityAvailability checkNameAvailability(@RequestParam(value = "name") String name) {
        Boolean isAvailable = !insurerRepository.existsByName(name);
        
        return new InsurerIdentityAvailability(isAvailable);
    }

	public ResponseEntity<List<Insurer>> getInsurers() {
    	List<Insurer> insurers = insurerRepository.findAll();
    	
    	return ResponseEntity.ok(insurers);
    }

	public ResponseEntity<Insurer> getInsurer(@PathVariable(value = "id") long id) {
    	Insurer insurer = insurerRepository.findById(id)
    			.orElseThrow(() -> new ResourceNotFoundException("Insurer", "id", id));
    	
    	return ResponseEntity.ok(insurer);
    }

	public ResponseEntity<ApiResponse> registerInsurer(@Valid @RequestBody SetInsurerRequest setInsurerRequest) {        
		
		if(insurerRepository.existsByName(setInsurerRequest.getName())) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Name already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
    	
		//Creating Insurer
		Insurer insurer = new Insurer(setInsurerRequest.getName());
		insurerRepository.save(insurer);
		
        return ResponseEntity.ok().body(new ApiResponse(true, "Insurer registered successfully"));
    }

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
		
        return ResponseEntity.ok().body(new ApiResponse(true, "Insurer updated successfully"));
    }

	public ResponseEntity<ApiResponse> deleteInsurer(@PathVariable(value = "id") long id) {        

		Insurer insurer = insurerRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Insurer", "id", id));
		
		insurerRepository.delete(insurer);
		
        return ResponseEntity.ok().body(new ApiResponse(true, "Insurer deleted successfully"));
    }
}
