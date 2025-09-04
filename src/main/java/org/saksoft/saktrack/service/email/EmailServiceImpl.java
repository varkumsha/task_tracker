package org.saksoft.saktrack.service.email;

import io.micrometer.common.util.StringUtils;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.saksoft.saktrack.dto.request.email.EmailRequestDetails;
import org.saksoft.saktrack.dto.response.GenericResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.thymeleaf.TemplateEngine;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class EmailServiceImpl implements EmailService {

    private final Logger LOGGER = LoggerFactory.getLogger(EmailServiceImpl.class);
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String mailFrom;

    public EmailServiceImpl(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    @Override
    public void sendSimpleMail(String to, String from, String subject, String content) {

        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, false);

            helper.setTo(to);
            helper.setFrom(from);
            helper.setSubject(subject);
            helper.setText(content, false);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        mailSender.send(message);
    }

    @Override
    public ResponseEntity<GenericResponse> sendMail(String authToken, EmailRequestDetails emailRequestDetails) {
        GenericResponse finalResponse = new GenericResponse();
        try {
            String validationMsg = validateRequiredField(emailRequestDetails);
            if (null != validationMsg) {
                finalResponse.setStatus(Boolean.FALSE.toString());
                finalResponse.setMessage("Please provide details: " + validationMsg);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(finalResponse);
            }

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false);

            helper.setTo(emailRequestDetails.getMailTo());
            helper.setFrom(mailFrom);
            helper.setSubject(emailRequestDetails.getMailSubject());
            helper.setText(emailRequestDetails.getMailContent(), false);
            if (!emailRequestDetails.getIsSendImmediately()) helper.setSentDate(emailRequestDetails.getScheduleDateTime());


            mailSender.send(message);
            finalResponse.setMessage("Email sent successfully");
            finalResponse.setStatus(Boolean.TRUE.toString());
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("Error while sending mail:{}", e.getMessage());
            finalResponse.setMessage("Error while sending mail. Please try again in sometime");
            finalResponse.setStatus(Boolean.FALSE.toString());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(finalResponse);
        }
        return ResponseEntity.status(HttpStatus.OK).body(finalResponse);
    }

    private String validateRequiredField(EmailRequestDetails emailRequestDetails) {
        List<String> errorMsgList = new ArrayList<>();
        if (StringUtils.isBlank(emailRequestDetails.getMailTo())) errorMsgList.add("TO");
        if (StringUtils.isBlank(emailRequestDetails.getMailContent())) errorMsgList.add("Content");
        if (StringUtils.isBlank(emailRequestDetails.getTeamName())) errorMsgList.add("Team Name");

        return CollectionUtils.isEmpty(errorMsgList) ? null : errorMsgList.stream().collect(Collectors.joining(","));

    }
}
