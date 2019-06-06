package com.dai.watersurance.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.dai.watersurance.model.User;

@Projection(name = "userProfile", types = { User.class })
public interface UserProfile {
	
	@Value("#{target.id}")
	Long getId();
	
	String getEmail();
	
	String getName();
	
	int getNif();
	
	int getPhoneNumber();

}
