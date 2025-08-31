package org.saksoft.saktrack.controller;

import org.saksoft.saktrack.dto.request.auth.LoginRequest;
import org.saksoft.saktrack.dto.request.user.UserRegistrationRequest;
import org.saksoft.saktrack.dto.response.GenericResponse;
import org.saksoft.saktrack.dto.response.auth.LoginResponse;
import org.saksoft.saktrack.service.auth.AuthService;
import org.saksoft.saktrack.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/auth/v1")
public class AuthController {

    private final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }


    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {

        LOGGER.info(loginRequest.toString());
        return authService.login(loginRequest);
    }

    @PostMapping("/register")
    public ResponseEntity<GenericResponse> registerNewUser(@RequestBody UserRegistrationRequest userRegistrationRequest) {
        return userService.registerNewUser(userRegistrationRequest);
    }
}
