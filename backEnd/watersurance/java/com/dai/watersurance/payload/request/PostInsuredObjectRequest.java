package com.dai.watersurance.payload.request;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;

public class PostInsuredObjectRequest {

	@Digits(integer = 11, fraction = 2)
	private double price;
	
	@NotBlank
	private String ref;
	
	@NotBlank
	private String description;

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
	
}
