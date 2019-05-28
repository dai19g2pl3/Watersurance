package com.dai.watersurance.projection;

import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.dai.watersurance.model.Contract;
import com.dai.watersurance.model.Insurer;
import com.dai.watersurance.model.User;

@Projection(name = "userProfile", types = { User.class })
public interface UserProfile {
	
	@Value("#{target.id}")
	Long getId();
	
	String getEmail();
	
	String getName();
	
	int getNif();
	
	int getPhoneNumber();
	
	Insurer getInsurer();
	
	Set<Contract> getContracts();
}
