package com.dai.watersurance.projection;

import java.time.Instant;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.dai.watersurance.model.Habitation;
import com.dai.watersurance.model.InsuredObject;
import com.dai.watersurance.model.Occurrence;

@Projection(name = "userIdHabitation", types = { Habitation.class })
public interface UserIdHabitation {

	@Value("#{target.id}")
	Long getId();
	
	Instant getCreatedAt();
	
	Instant getUpdatedAt();
	
	Long getCreatedBy();
	
	Long getUpdatedBy();
	
	String getAddress();
	
	String getZipCode();
	
	String getSensorQtd();
	
	Long getUserId();
	
	Set<InsuredObject> getInsuredObjects();
	
	Set<Occurrence> getOccurrences();
	
}
