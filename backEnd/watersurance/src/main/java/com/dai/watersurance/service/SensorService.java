package com.dai.watersurance.service;

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

import com.dai.watersurance.model.Sensor;
import com.dai.watersurance.payload.request.SensorOccurrenceRequest;
import com.dai.watersurance.payload.response.ApiResponse;

@Service
public class SensorService {

	@Autowired
	private MongoTemplate mongoTemplate;
	
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
	
	public ResponseEntity<List<Sensor>> registerSensorOccurrence(@PathVariable(value = "id") long id,
			@Valid @RequestBody SensorOccurrenceRequest sensorOccurrenceRequest) {
		Query query = new Query();
		Criteria c = new Criteria().andOperator(Criteria.where("date").gte(sensorOccurrenceRequest.getStartDate()),
				Criteria.where("date").lte(sensorOccurrenceRequest.getEndDate()));
		query.addCriteria(c);
		
		List<Sensor> sensor = mongoTemplate.find(query, Sensor.class, "Object - " + id);
		
		return ResponseEntity.ok().body(sensor);
		//return ResponseEntity.ok().body(new ApiResponse(true, "Sensor occurrence registered successfully"));
	}
}
