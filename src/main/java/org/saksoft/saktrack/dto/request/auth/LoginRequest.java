package org.saksoft.saktrack.dto.request.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginRequest {

    private String userName;
    private String password;
}
