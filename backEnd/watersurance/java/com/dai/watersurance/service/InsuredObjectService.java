package com.dai.watersurance.service;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.dai.watersurance.exception.ResourceNotFoundException;
import com.dai.watersurance.model.Habitation;
import com.dai.watersurance.model.InsuredObject;
import com.dai.watersurance.model.User;
import com.dai.watersurance.payload.request.PostInsuredObjectRequest;
import com.dai.watersurance.payload.request.UpdateInsuredObjectRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.repository.HabitationRepository;
import com.dai.watersurance.repository.InsuredObjectRepository;
import com.dai.watersurance.repository.UserRepository;
import com.dai.watersurance.security.CurrentUser;
import com.dai.watersurance.security.UserPrincipal;

@Service
public class InsuredObjectService {

	@Autowired
	private InsuredObjectRepository insuredObjectRepository;
	
	@Autowired
	private HabitationRepository habitationRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	//return insured object by it's id
	public ResponseEntity<InsuredObject> getInsuredObject(@PathVariable(value = "id") long id) {
		InsuredObject object = insuredObjectRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Insured Object", "id", id));
		
		return ResponseEntity.ok().body(object);
	}
	
	//return insured object by it's id of logged user
	public ResponseEntity<?> getMyInsuredObject(@PathVariable(value = "id") long id,
			@CurrentUser UserPrincipal currentUser) {
		User user = userRepository.findById(currentUser.getId())
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));
		
		if(!insuredObjectRepository.existsById(id)) {
			throw new ResourceNotFoundException("Insured Object", "id", id);
		}
			
		for(Habitation habitation : user.getHabitations()) {
			for(InsuredObject insuredObject : habitation.getInsuredObjects()) {
				if(insuredObject.getId() == id) {
					return ResponseEntity.ok(insuredObject);
				}
			}
		}
		
		return new ResponseEntity<ApiResponse>(new ApiResponse(false, "This insured object is not yours"),
				HttpStatus.FORBIDDEN);
	}
	
	//register insured object by it's id
	public ResponseEntity<ApiResponse> registerInsuredObject(@PathVariable(value = "id") long id,
			@Valid @RequestBody PostInsuredObjectRequest postInsuredObjectRequest) {
		Habitation habitation = habitationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Habitation", "id", id));;
		
		InsuredObject object = new InsuredObject(postInsuredObjectRequest.getPrice(), postInsuredObjectRequest.getRef(),
				postInsuredObjectRequest.getDescription(), false, habitation, null);
		
		insuredObjectRepository.save(object);
		
		return ResponseEntity.ok().body(new ApiResponse(true, "Insured Object registered successfully"));
	}
	
	//update insured object by it's id
	public ResponseEntity<ApiResponse> updateInsuredObject(@PathVariable(value = "id") long id, 
			@Valid @RequestBody UpdateInsuredObjectRequest updateInsuredObjectRequest) {
		InsuredObject object = insuredObjectRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Insured Object", "id", id));
		
		object.setPrice(updateInsuredObjectRequest.getPrice());
		object.setRef(updateInsuredObjectRequest.getRef());
		object.setDescription(updateInsuredObjectRequest.getDescription());
		object.setWasInsured(updateInsuredObjectRequest.getWasInsured());
		
		insuredObjectRepository.save(object);
		
		return ResponseEntity.ok().body(new ApiResponse(true, "Insured Object updated successfully"));
	}
	
	//delete insured object by it's id
	public ResponseEntity<ApiResponse> deleteInsuredObject(@PathVariable(value = "id") long id) {
		InsuredObject object = insuredObjectRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Insured Object", "id", id));
		
		insuredObjectRepository.delete(object);
		
		return ResponseEntity.ok().body(new ApiResponse(true, "Insured Object deleted successfully"));
	}

}
