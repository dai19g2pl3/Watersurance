package com.dai.watersurance.service;

import java.util.List;
import java.util.Set;

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
import com.dai.watersurance.model.Occurrence;
import com.dai.watersurance.model.User;
import com.dai.watersurance.payload.request.PostOccurrenceRequest;
import com.dai.watersurance.payload.request.UpdateOccurrenceRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.repository.HabitationRepository;
import com.dai.watersurance.repository.InsuredObjectRepository;
import com.dai.watersurance.repository.OccurrenceRepository;
import com.dai.watersurance.repository.UserRepository;
import com.dai.watersurance.security.CurrentUser;
import com.dai.watersurance.security.UserPrincipal;

@Service
public class OccurrenceService {

	@Autowired
	private OccurrenceRepository occurrenceRepository;
	
	@Autowired
	private HabitationRepository habitationRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private InsuredObjectRepository insuredObjectRepository;
	
	// return occurrence by it's id
	public ResponseEntity<Occurrence> getOccurrence(@PathVariable(value = "id") long id) {
		Occurrence occurrence = occurrenceRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Occurrence", "id", id));
			
		return ResponseEntity.ok(occurrence);
	}

	// return occurrence by it's id of logged user
	public ResponseEntity<?> getMyOccurrence(@PathVariable(value = "id") long id,
			@CurrentUser UserPrincipal currentUser) {
		User user = userRepository.findById(currentUser.getId())
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));
		
		if(!occurrenceRepository.existsById(id)) {
			throw new ResourceNotFoundException("Occurrence", "id", id);
		}
			
		for(Habitation habitation : user.getHabitations()) {
			for(Occurrence occurrence : habitation.getOccurrences()) {
				if(occurrence.getId() == id) {
					return ResponseEntity.ok(occurrence);
				}
			}
		}
		
		return new ResponseEntity<ApiResponse>(new ApiResponse(false, "This occurrence is not yours"),
				HttpStatus.FORBIDDEN);
	}

	// register occurrence by habitation id
	public ResponseEntity<ApiResponse> registerOccurrence(@PathVariable(value = "id") long id,
			@Valid @RequestBody PostOccurrenceRequest postOccurrenceRequest) {
		Habitation habitation = habitationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Habitation", "id", id));
		
		Occurrence occurrence = new Occurrence();
		Set<Long> insuredObjectIds = postOccurrenceRequest.getInsuredObjects();
		double price = calculatePriceForPost(insuredObjectIds);
			
		occurrence.setPrice(price);
		occurrence.setStartDate(postOccurrenceRequest.getStartDate());
		occurrence.setEndDate(postOccurrenceRequest.getEndDate());
		occurrence.setHabitation(habitation);
		occurrenceRepository.saveAndFlush(occurrence);
		
		Long idOccurrence = occurrence.getId();
		for(Long objectId: insuredObjectIds) {
			System.out.println("Occurrence Id: " + idOccurrence + "\tObject id: " + objectId);
			insuredObjectRepository.updateInsuredObjectAddOccurrence(idOccurrence, objectId);
		}
		
		return ResponseEntity.ok().body(new ApiResponse(true, "Occurrence registered successfully"));
	}

	// update occurrence by it's id
	public ResponseEntity<ApiResponse> updateOccurrence(@PathVariable(value = "id") long id,
			@Valid @RequestBody UpdateOccurrenceRequest updateOccurrenceRequest) {
		Occurrence occurrence = occurrenceRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Occurrence", "id", id));
		
		List<List<Long>> insuredObjectIds = updateOccurrenceRequest.getInsuredObjects();
		double price = calculatePriceForUpdate(insuredObjectIds);
		
		occurrence.setPrice(price);
		occurrence.setStartDate(updateOccurrenceRequest.getStartDate());
		occurrence.setEndDate(updateOccurrenceRequest.getEndDate());
		occurrenceRepository.save(occurrence);
		
		for(int i = 0 ; i < insuredObjectIds.size(); i++) {
			Long insuredObjectId = insuredObjectIds.get(i).get(0);
			Long wasInsured = insuredObjectIds.get(i).get(1);
			if(wasInsured == 0) {
				insuredObjectRepository.updateInsuredObjectRemoveOccurrence(insuredObjectId);
			} else insuredObjectRepository.updateInsuredObjectAddOccurrence(id, insuredObjectId);
			
		}
		
		return ResponseEntity.ok().body(new ApiResponse(true, "Occurrence updated successfully"));
	}

	// delete occurrence by it's id
	public ResponseEntity<ApiResponse> deleteOccurrence(@PathVariable(value = "id") long id) {
		Occurrence occurrence = occurrenceRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Occurrence", "id", id));
		
		occurrenceRepository.delete(occurrence);
		
		return ResponseEntity.ok().body(new ApiResponse(true, "Occurrence deleted successfully"));
	}
	
	
	private double calculatePriceForPost(Set<Long> ids) {
		double price = 0;

		for(long insuredObjectId: ids) {
			InsuredObject insuredObject = insuredObjectRepository.findById(insuredObjectId)
					.orElseThrow(() -> new ResourceNotFoundException("Insured Object", "id", insuredObjectId));
			
			price += insuredObject.getPrice();
		}
		
		return price;
	}
	
	private double calculatePriceForUpdate(List<List<Long>> ids) {
		double price = 0;
		
		for(int i = 0 ; i < ids.size(); i++) {
			Long wasInsured = ids.get(i).get(1);
			if(wasInsured == 1) {
				Long insuredObjectId = ids.get(i).get(0);
				InsuredObject insuredObject = insuredObjectRepository.findById(insuredObjectId)
						.orElseThrow(() -> new ResourceNotFoundException("Insured Object", "id", insuredObjectId));

				price += insuredObject.getPrice();
			}

		}
		
		return price;
	}
	
}
