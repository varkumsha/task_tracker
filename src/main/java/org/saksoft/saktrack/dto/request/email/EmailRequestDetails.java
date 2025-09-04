package org.saksoft.saktrack.dto.request.email;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmailRequestDetails {

    private String mailTo;
    private String mailSubject;
    private String mailContent;
    private String teamName;
    private Integer requiredDays;
    private Date scheduleDateTime;
    private Boolean isSendImmediately;


}
