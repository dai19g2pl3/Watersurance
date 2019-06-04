package com.dai.watersurance.payload.request;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class PostUserOrInsurerRequestTable {

	@NotBlank
    @Size(min = 4, max = 40)
    private String name;
    
    @Size(max = 40)
    @Email
    private String email;
    
    @NotBlank
    @Size(min = 6, max = 20)
    private String password;
    
    @Pattern(regexp = "\\d{9}", message = "Number must have 9 digits")
    private String nif;
    
    @Pattern(regexp = "(9[1236][0-9]) ?([0-9]{3}) ?([0-9]{3})", message = "Invalid phone number")
    private String phoneNumber;
    
    private String isActive;
    
    @AssertTrue(message = "Must be true or false")
    private boolean isActive() {
    	return isActive.equals("true") || isActive.equals("false");
    }
    
    private String role;

    @AssertTrue(message = "Ivalid role")
    private boolean isOk() {
    	return role.equals("ROLE_USER") || role.equals("ROLE_INSURER");
    }

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
	
	public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

	public boolean getIsActive() {
		return Boolean.parseBoolean(isActive);
	}

	public void setIsActive(String isActive) {
		this.isActive = isActive;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
}
