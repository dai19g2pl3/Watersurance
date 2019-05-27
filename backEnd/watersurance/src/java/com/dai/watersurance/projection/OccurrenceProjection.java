package com.dai.watersurance.projection;

import java.util.Date;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.dai.watersurance.model.Habitation;
import com.dai.watersurance.model.InsuredObject;
import com.dai.watersurance.model.Occurrence;

@Projection(name = "occurrenceProjection", types = { Occurrence.class })
public interface OccurrenceProjection {

	@Value("#{target.id}")
	Long getId();
	
	Date getStartDate();
	
	Date getEndDate();
	
	double getPrice();
	
	Habitation getHabitation();

	Set<InsuredObject> getInsuredObjects();
}

