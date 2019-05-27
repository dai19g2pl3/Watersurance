package com.dai.watersurance.payload.request;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

public class UpdateOccurrenceRequest {

	@NotNull
	private String startDate;
	
	@NotNull
	private String endDate;

	@Valid
	private List<List<Long>> insuredObjects;


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

	public List<List<Long>> getInsuredObjects() {
		return insuredObjects;
	}

	public void setInsuredObjects(List<List<Long>> insuredObjects) {
		this.insuredObjects = insuredObjects;
	}

}
