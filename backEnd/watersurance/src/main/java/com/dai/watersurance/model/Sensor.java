package com.dai.watersurance.model;

import java.util.Date;

public class Sensor {
	
	private String type;
	
	private String value;
	
	private Date date;
	
	public Sensor() {};

	public Sensor(String type, String value, Date date) {
		super();
		this.type = type;
		this.value = value;
		this.date = date;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
	
}
