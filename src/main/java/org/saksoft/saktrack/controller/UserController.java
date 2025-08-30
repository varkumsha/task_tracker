package org.saksoft.saktrack.controller;

import org.saksoft.saktrack.dto.request.user.UserRegistrationRequest;
import org.saksoft.saktrack.dto.response.GenericResponse;
import org.saksoft.saktrack.dto.response.user.UserListDetailsResponse;
import org.saksoft.saktrack.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/user/v1/")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/users")
    public ResponseEntity<UserListDetailsResponse> getUserDetailsRequest(@RequestHeader("Authorization") String authToken) {

        return userService.fetchAllUsers(null);
    }

    @PostMapping("/register")
    public ResponseEntity<GenericResponse> registerNewUser(@RequestBody UserRegistrationRequest userRegistrationRequest, @RequestHeader("Authorization") String authToken) {
        return userService.registerNewUser(authToken,userRegistrationRequest);

    }
}
