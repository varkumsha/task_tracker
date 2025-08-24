package org.saksoft.saktrack.controller;

import org.saksoft.saktrack.dto.response.user.UserListDetailsResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.saksoft.saktrack.service.user.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/user/v1/")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/users")
    public ResponseEntity<UserListDetailsResponse> getUserDetailsRequest() {

        return userService.fetchAllUsers(null);
    }
}
