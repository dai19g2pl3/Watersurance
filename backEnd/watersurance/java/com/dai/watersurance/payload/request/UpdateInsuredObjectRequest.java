package com.dai.watersurance.payload.request;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;

public class UpdateInsuredObjectRequest {

	@Digits(integer = 11, fraction = 2)
	private double price;
	
	@NotBlank
	private String ref;
	
	@NotBlank
	private String description;
	
	private String wasInsured;
    
    @AssertTrue(message = "Must be true or false")
    private boolean isActive() {
    	return wasInsured.equals("true") || wasInsured.equals("false");
    }

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getRef() {
		return ref;
	}

	public void setRef(String ref) {
		this.ref = ref;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean getWasInsured() {
		return Boolean.parseBoolean(wasInsured);
	}

	public void setWasInsured(String wasInsured) {
		this.wasInsured = wasInsured;
	}
	
}
