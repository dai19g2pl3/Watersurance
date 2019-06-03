package com.dai.watersurance.service;

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
import com.dai.watersurance.model.InsuredObject;
import com.dai.watersurance.model.Occurrence;
import com.dai.watersurance.model.Sensor;
import com.dai.watersurance.payload.request.SensorOccurrenceRequest;
import com.dai.watersurance.payload.response.ApiResponse;
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
		
		List<Sensor> sensors = mongoTemplate.find(query, Sensor.class, "Object - " + id);
		Occurrence occurrence = new Occurrence();
		boolean wasOccurrenceCreated = false;
		int i = 0;
		
		if(sensors.size() != 0) {
			for(Sensor sensor : sensors) {
				if(Integer.parseInt(sensor.getValue()) >= 50) {
					wasOccurrenceCreated = createOccurrence(occurrence, id, sensorOccurrenceRequest.getStartDate(),
							sensorOccurrenceRequest.getEndDate());
					System.out.println(i);
					i++;
					break;
				}
			}
		} else return ResponseEntity.ok().body(new ApiResponse(false, "Insured Object collection is empty"));
		
		return ResponseEntity.ok().body(new ApiResponse(wasOccurrenceCreated, "Sensor occurrence registered successfully"));
	}
	
	private boolean createOccurrence(Occurrence occurrence, long id, Date startDate, Date endDate) {
		InsuredObject insuredObject = insuredObjectRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Insured Object", "id", id));

		occurrence.setPrice(insuredObject.getPrice());
		occurrence.setStartDate(startDate);
		occurrence.setEndDate(endDate);
		occurrence.setHabitation(insuredObject.getHabitation());
		occurrenceRepository.saveAndFlush(occurrence);
		
		Long idOccurrence = occurrence.getId();
		insuredObjectRepository.updateInsuredObjectAddOccurrence(idOccurrence, id);
		
		return true;
	}
}
