package org.saksoft.saktrack.controller;

import org.saksoft.saktrack.dto.request.email.EmailRequestDetails;
import org.saksoft.saktrack.dto.response.GenericResponse;
import org.saksoft.saktrack.service.email.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email/v1")
public class EmailController {
    private final Logger LOGGER = LoggerFactory.getLogger(EmailController.class);


    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/template/sent")
    public ResponseEntity<GenericResponse> sendMail(@RequestHeader("Authorization")String authToken, @RequestBody EmailRequestDetails emailRequestDetails){
          return emailService.sendMail(authToken,emailRequestDetails);
    }
}
