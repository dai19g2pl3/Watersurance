package com.dai.watersurance.service;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.dai.watersurance.exception.ResourceNotFoundException;
import com.dai.watersurance.model.Habitation;
import com.dai.watersurance.model.InsuredObject;
import com.dai.watersurance.payload.request.InsuredObjectRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.repository.HabitationRepository;
import com.dai.watersurance.repository.InsuredObjectRepository;

@Service
public class InsuredObjectService {

	@Autowired
	private InsuredObjectRepository insuredObjectRepository;
	
	@Autowired
	private HabitationRepository habitationRepository;
		
	public ResponseEntity<InsuredObject> getInsuredObject(@PathVariable(value = "id") long id) {
		InsuredObject object = insuredObjectRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Insured Object", "id", id));
		
		return ResponseEntity.ok().body(object);
	}
	
	public ResponseEntity<ApiResponse> registerInsuredObject(@PathVariable(value = "id") long id,
			@Valid @RequestBody InsuredObjectRequest insuredObjectRequest) {
		Habitation habitation = habitationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Habitation", "id", id));;
		
		InsuredObject object = new InsuredObject(insuredObjectRequest.getPrice(), insuredObjectRequest.getRef(),
				insuredObjectRequest.getDescription(), insuredObjectRequest.getWasInsured(), habitation, null);
		
		insuredObjectRepository.save(object);
		
		return ResponseEntity.ok().body(new ApiResponse(true, "Insured Object registered successfully"));
	}
	
	public ResponseEntity<ApiResponse> updateInsuredObject(@PathVariable(value = "id") long id, 
			@Valid @RequestBody InsuredObjectRequest insuredObjectRequest) {
		InsuredObject object = insuredObjectRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Insured Object", "id", id));
		
		object.setPrice(insuredObjectRequest.getPrice());
		object.setRef(insuredObjectRequest.getRef());
		object.setDescription(insuredObjectRequest.getDescription());
		object.setWasInsured(insuredObjectRequest.getWasInsured());
		
		insuredObjectRepository.save(object);
		
		return ResponseEntity.ok().body(new ApiResponse(true, "Insured Object updated successfully"));
	}
	
	public ResponseEntity<ApiResponse> deleteInsuredObject(@PathVariable(value = "id") long id) {
		InsuredObject object = insuredObjectRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Insured Object", "id", id));
		
		insuredObjectRepository.delete(object);
		
		return ResponseEntity.ok().body(new ApiResponse(true, "Insured Object deleted successfully"));
	}
}
