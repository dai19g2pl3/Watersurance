package com.dai.watersurance.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import com.dai.watersurance.projection.NoPwdUser;
import com.dai.watersurance.projection.UserIdHabitation;
import com.dai.watersurance.projection.UserProfile;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@Configuration
public class RepositoryConfig implements RepositoryRestConfigurer {

	@Configuration
	public class RestConfig implements RepositoryRestConfigurer {

	    @Override
	    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration repositoryRestConfiguration) {
	        repositoryRestConfiguration.getProjectionConfiguration().addProjection(NoPwdUser.class);
	        repositoryRestConfiguration.getProjectionConfiguration().addProjection(UserIdHabitation.class);
	        repositoryRestConfiguration.getProjectionConfiguration().addProjection(UserProfile.class);    
	    }
	}
}
