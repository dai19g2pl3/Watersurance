package com.dai.watersurance.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dai.watersurance.model.Sensor;
import com.dai.watersurance.payload.request.SensorOccurrenceRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.service.SensorService;

@RestController
@RequestMapping("/api")
public class SensorController {
	
	@Autowired
	private SensorService sensorService;
	
	@GetMapping("/habitationSensor/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER') or hasRole('USER')")
	public ResponseEntity<Sensor> getLastHabitationSensorValue(@PathVariable(value = "id") long id) {
		return sensorService.getLastHabitationSensorValue(id);
	}
	
	@GetMapping("/objectSensor/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER') or hasRole('USER')")
	public ResponseEntity<Sensor> getLastObjectSensorValue(@PathVariable(value = "id") long id) {
		return sensorService.getLastObjectSensorValue(id);
	}
	
	@PostMapping("/occurrenceSensor/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSURER') or hasRole('USER')")
	public ResponseEntity<ApiResponse> registerSensorOccurrence(@PathVariable(value = "id") long id,
			@Valid @RequestBody SensorOccurrenceRequest sensorOccurrenceRequest) {
		return sensorService.registerSensorOccurrence(id, sensorOccurrenceRequest);
	}
	
}