package com.dai.watersurance.payload.request;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.validation.constraints.NotNull;

public class SensorOccurrenceRequest {

	@NotNull
	private String startDate;
	
	@NotNull
	private String endDate;
	
	public Date getStartDate() {
		Date date = null;
		
		try {
			date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(startDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
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
	
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}	
	
}
