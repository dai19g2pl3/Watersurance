package com.dai.watersurance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.dai.watersurance.exception.ResourceNotFoundException;
import com.dai.watersurance.model.User;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.repository.UserRepository;
import com.dai.watersurance.security.CurrentUser;
import com.dai.watersurance.security.UserPrincipal;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;

@Service
public class EmailService {

	@Autowired
	public JavaMailSender emailSender;
	
	@Autowired
    private UserRepository userRepository;
	
	public ResponseEntity<ApiResponse> sendEmail(@CurrentUser UserPrincipal currentUser) throws MessagingException {
    	User user = userRepository.findById(currentUser.getId(), User.class)
    			.orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));
		System.out.println("arroz");
		MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
        		MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
        		StandardCharsets.UTF_8.name());
        
        helper.addAttachment("watersurance.png", new ClassPathResource("watersurance.jpg"));
        String inlineImage = "<img src=\"cid:watersurance.png\"></img><br/>";

        helper.setText(inlineImage + "Está a decorrer uma inundação!", true);
        helper.setSubject("Inundação");
        helper.setTo(user.getEmail());

        emailSender.send(message);
        
        return ResponseEntity.ok().body(new ApiResponse(true, "Email was sent successfully"));
    }
}
