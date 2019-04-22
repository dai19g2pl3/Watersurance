package com.dai.watersurance.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import com.dai.watersurance.projection.NoPwdUser;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@Configuration
public class RepositoryConfig implements RepositoryRestConfigurer {

	@Configuration
	public class RestConfig implements RepositoryRestConfigurer {

	    @Override
	    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration repositoryRestConfiguration) {
	        repositoryRestConfiguration.getProjectionConfiguration().addProjection(NoPwdUser.class);
	    }
	}
}
