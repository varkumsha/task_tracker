package org.saksoft.saktrack.dto.response.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.saksoft.saktrack.dto.response.GenericResponse;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoginResponse extends GenericResponse {
    private String token;
}
