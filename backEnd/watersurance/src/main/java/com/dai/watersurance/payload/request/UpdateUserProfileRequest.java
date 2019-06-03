package com.dai.watersurance.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class UpdateUserProfileRequest {

	@NotBlank
    @Size(min = 4, max = 40)
    private String name;
    
    @Size(max = 40)
    @Email
    private String email;
    
    @Pattern(regexp = "\\d{9}", message = "Number must have 9 digits")
    private String nif;
    
    @Pattern(regexp = "(9[1236][0-9]) ?([0-9]{3}) ?([0-9]{3})", message = "Invalid phone number")
    private String phoneNumber;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getNif() {
		return Integer.parseInt(nif);
	}

	public void setNif(String nif) {
		this.nif = nif;
	}

	public int getPhoneNumber() {
		return Integer.parseInt(phoneNumber.replaceAll("\\s",""));
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
    
}
