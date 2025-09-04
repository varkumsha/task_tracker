package org.saksoft.saktrack.service.email;

import org.saksoft.saktrack.dto.request.email.EmailRequestDetails;
import org.saksoft.saktrack.dto.response.GenericResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface EmailService {

  void sendSimpleMail(String to,String from, String subject, String content);

    ResponseEntity<GenericResponse> sendMail(String authToken, EmailRequestDetails emailRequestDetails);
}
