package com.dai.watersurance.projection;

import java.time.Instant;
import java.util.Date;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.dai.watersurance.model.Role;
import com.dai.watersurance.model.User;

@Projection(name = "noPwdUser", types = { User.class })
public interface NoPwdUser {
	
	@Value("#{target.id}")
	Long getId();
	
	Instant getCreatedAt();
	
	Instant getUpdatedAt();
	
	String getEmail();
	
	String getName();
	
	int getNif();
	
	int getPhoneNumber();
	
	Date getLastLogin();

	boolean isActive();
	
	Set<Role> getRoles();
}
