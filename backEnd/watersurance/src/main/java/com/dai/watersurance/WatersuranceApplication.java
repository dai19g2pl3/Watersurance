package com.dai.watersurance;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

@SpringBootApplication
@EntityScan(basePackageClasses = {
		WatersuranceApplication.class,
		Jsr310JpaConverters.class
})
public class WatersuranceApplication extends SpringBootServletInitializer {

	@PostConstruct
	void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("Europe/Lisbon"));
	}
	
	public static void main(String[] args) {
		SpringApplication.run(WatersuranceApplication.class, args);
	}

}
