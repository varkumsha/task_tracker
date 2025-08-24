package org.saksoft.saktrack.service.auth;

import org.saksoft.saktrack.dto.request.auth.LoginRequest;
import org.saksoft.saktrack.dto.response.auth.LoginResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public interface AuthService {
    ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest);
}
