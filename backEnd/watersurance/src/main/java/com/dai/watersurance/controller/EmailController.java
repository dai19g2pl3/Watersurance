package com.dai.watersurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dai.watersurance.service.EmailService;

@RestController
@RequestMapping("/api/email/")
public class EmailController {

	@Autowired
	private EmailService emailService;
	
	
}
