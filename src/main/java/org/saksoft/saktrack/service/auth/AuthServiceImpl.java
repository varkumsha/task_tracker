package org.saksoft.saktrack.service.auth;

import org.saksoft.saktrack.dto.request.auth.LoginRequest;
import org.saksoft.saktrack.dto.response.auth.LoginResponse;
import org.saksoft.saktrack.model.User;
import org.saksoft.saktrack.repository.UserRepository;
import org.saksoft.saktrack.service.jwt.JwtUtils;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
public class AuthServiceImpl implements AuthService {

    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final Logger LOGGER = Logger.getLogger(AuthServiceImpl.class.getName());

    public AuthServiceImpl(JwtUtils jwtUtils, UserRepository userRepository) {
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity<LoginResponse> login(LoginRequest loginRequest) {

        LoginResponse loginResponse = new LoginResponse();
        if (null == loginRequest) {
            loginResponse.setMessage("Login Request is null");
            loginResponse.setStatus(Boolean.FALSE.toString());
            loginResponse.setToken(null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(loginResponse);
        }

        User userData = userRepository.findByUserName(loginRequest.getUserName());
        if (null == userData) {
            loginResponse.setMessage("User not found");
            loginResponse.setStatus(Boolean.FALSE.toString());
            loginResponse.setToken(null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(loginResponse);
        }
        if (!userData.getPassword().equals(loginRequest.getPassword())) {
            loginResponse.setMessage("Wrong Password");
            loginResponse.setStatus(Boolean.FALSE.toString());
            loginResponse.setToken(null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginResponse);
        }

        String token = jwtUtils.generateJwtToken(loginRequest.getUserName());
        loginResponse.setToken(token);
        loginResponse.setStatus(Boolean.TRUE.toString());
        loginResponse.setMessage("Login Successful");

        return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
    }
}
