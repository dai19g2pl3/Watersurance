package com.dai.watersurance.payload.request;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class HabitationRequest {

	@NotBlank
	@Size(max = 80)
	private String address;
	
	@NotBlank
	@Pattern(regexp = "([1-9][0-9]{3}-[0-9]{3})", message = "Invalid zip code")
	private String zipCode;
	
	@Digits(integer = 2, fraction = 0)
	private int sensorQtd;

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public int getSensorQtd() {
		return sensorQtd;
	}

	public void setSensorQtd(int sensorQtd) {
		this.sensorQtd = sensorQtd;
	}
	
}
