package com.dai.watersurance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;

@Service
public class EmailService {

	@Autowired
	public JavaMailSender emailSender;
	
	public void sendSimpleMessage(String to, String subject, String text, String content) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
        		MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
        		StandardCharsets.UTF_8.name());

        helper.addAttachment("logo.png", new ClassPathResource("memorynotfound-logo.png"));
        String inlineImage = "<img src=\"cid:logo.png\"></img><br/>";

        helper.setText(inlineImage + content, true);
        helper.setSubject(subject);
        helper.setTo(to);

        emailSender.send(message);
    }
}