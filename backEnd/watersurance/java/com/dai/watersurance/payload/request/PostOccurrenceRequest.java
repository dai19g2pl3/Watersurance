package com.dai.watersurance.payload.request;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

public class PostOccurrenceRequest {

	@NotNull
	private String startDate;
	
	@NotNull
	private String endDate;

	@Valid
	private Set<Long> insuredObjects;

	public Date getStartDate() {
		Date date = null;
		
		try {
			date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(startDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		Date date = null;
		
		try {
			date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(endDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public Set<Long> getInsuredObjects() {
		return insuredObjects;
	}

	public void setInsuredObjects(Set<Long> insuredObjects) {
		this.insuredObjects = insuredObjects;
	}

}
