package com.dai.watersurance.controller;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.security.CurrentUser;
import com.dai.watersurance.security.UserPrincipal;
import com.dai.watersurance.service.EmailService;

@RestController
@RequestMapping("/api/email/")
public class EmailController {

	@Autowired
	private EmailService emailService;

	@PostMapping("{id}")
	public ResponseEntity<ApiResponse> sendEmail(@CurrentUser UserPrincipal currentUser) {
		try {
			return emailService.sendEmail(currentUser);
		} catch (MessagingException e) {
			System.out.println("Fode-te");
			e.printStackTrace();
		}
		return null;
	}

}
