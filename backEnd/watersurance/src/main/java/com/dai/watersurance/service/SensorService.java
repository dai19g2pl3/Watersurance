
package com.dai.watersurance.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.dai.watersurance.exception.ResourceNotFoundException;
import com.dai.watersurance.model.Habitation;
import com.dai.watersurance.model.InsuredObject;
import com.dai.watersurance.model.Occurrence;
import com.dai.watersurance.model.Sensor;
import com.dai.watersurance.payload.request.SensorOccurrenceRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.repository.HabitationRepository;
import com.dai.watersurance.repository.InsuredObjectRepository;
import com.dai.watersurance.repository.OccurrenceRepository;

@Service
public class SensorService {

	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Autowired
	private OccurrenceRepository occurrenceRepository;
	
	@Autowired
	private InsuredObjectRepository insuredObjectRepository;
	
	@Autowired
	private HabitationRepository habitationRepository;
	
	public ResponseEntity<Sensor> getLastHabitationSensorValue(@PathVariable(value = "id") long id) {
		Query query = new Query();
	    query.limit(1);
	    query.with(new Sort(Sort.Direction.DESC, "date"));

	    Sensor sensor = mongoTemplate.findOne(query, Sensor.class, "Habitation - " + id);
	    
		return ResponseEntity.ok(sensor);
	}
	
	public ResponseEntity<Sensor> getLastObjectSensorValue(@PathVariable(value = "id") long id) {
		Query query = new Query();
	    query.limit(1);
	    query.with(new Sort(Sort.Direction.DESC, "date"));

	    Sensor sensor = mongoTemplate.findOne(query, Sensor.class, "Object - " + id);

		return ResponseEntity.ok(sensor);
	}
	
	public ResponseEntity<ApiResponse> registerSensorOccurrence(@PathVariable(value = "id") long id,
			@Valid @RequestBody SensorOccurrenceRequest sensorOccurrenceRequest) {
		Query query = new Query();
		Criteria c = new Criteria().andOperator(Criteria.where("date").gte(sensorOccurrenceRequest.getStartDate()),
				Criteria.where("date").lte(sensorOccurrenceRequest.getEndDate()));
		query.addCriteria(c);
		
		Habitation habitation = habitationRepository.findById(id, Habitation.class)
				.orElseThrow(() -> new ResourceNotFoundException("Habitation", "id", id));
		
		Occurrence occurrence = new Occurrence();
		boolean wasOccurrenceCreated = false;
		List<Sensor> sensors = new ArrayList<>();
		for(InsuredObject object : habitation.getInsuredObjects()) {
			sensors = mongoTemplate.find(query, Sensor.class, "Object - " + object.getId());
			System.out.println(sensors.size());
			
			if(sensors.size() != 0) {
				for(Sensor sensor : sensors) {
					if(Integer.parseInt(sensor.getValue()) > 150) {
						wasOccurrenceCreated = createOccurrence(occurrence, object.getId(), sensorOccurrenceRequest.getStartDate(),
								sensorOccurrenceRequest.getEndDate());
						System.out.println(sensor.getValue());
						System.out.println(object.getId());
						break;
					} else System.out.println("Sensor value below 50 (" + sensor.getValue() + ")");
				} 
			} else System.out.println("Insured object collection is empty with id: " + object.getId());
			
		}
		
		return ResponseEntity.ok().body(new ApiResponse(wasOccurrenceCreated, "Sensor occurrence registered successfully"));
	}
	
	private boolean createOccurrence(Occurrence occurrence, long idObject, Date startDate, Date endDate) {
		InsuredObject insuredObject = insuredObjectRepository.findById(idObject)
				.orElseThrow(() -> new ResourceNotFoundException("Insured Object", "id", idObject));

		occurrence.setPrice(insuredObject.getPrice());
		occurrence.setStartDate(startDate);
		occurrence.setEndDate(endDate);
		occurrence.setHabitation(insuredObject.getHabitation());
		occurrence.addInsuredObject(insuredObject);
		occurrenceRepository.saveAndFlush(occurrence);
		
		//Long idOccurrence = occurrence.getId();
		//insuredObjectRepository.updateInsuredObjectAddOccurrence(idOccurrence, idObject);
		
		return true;
	}
}