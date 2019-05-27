package com.dai.watersurance.projection;

import java.time.Instant;
import java.util.Date;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.dai.watersurance.model.Contract;
import com.dai.watersurance.model.Insurer;
import com.dai.watersurance.model.Role;
import com.dai.watersurance.model.User;

@Projection(name = "noPwdUser", types = { User.class })
public interface NoPwdUser {
	
	@Value("#{target.id}")
	Long getId();
	
	Instant getCreatedAt();
	
	Instant getUpdatedAt();
	
	Long getCreatedBy();
	
	Long getUpdatedBy();
	
	String getEmail();
	
	String getName();
	
	int getNif();
	
	int getPhoneNumber();
	
	Date getLastLogin();

	boolean getIsActive();
	
	Insurer getInsurer();
	
	Set<Contract> getContracts();
	
	Set<Role> getRoles();
}
