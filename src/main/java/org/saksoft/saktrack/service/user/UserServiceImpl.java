package org.saksoft.saktrack.service.user;

import org.saksoft.saktrack.dto.request.user.UserDetailsRequest;
import org.saksoft.saktrack.dto.request.user.UserRegistrationRequest;
import org.saksoft.saktrack.dto.response.GenericResponse;
import org.saksoft.saktrack.dto.response.user.UserListDetailsResponse;
import org.saksoft.saktrack.dto.response.user.UserResponse;
import org.saksoft.saktrack.model.User;
import org.saksoft.saktrack.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserServiceImpl implements UserService {

    private final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity<UserListDetailsResponse> fetchAllUsers(UserDetailsRequest request) {
        List<User> users = userRepository.findAll();
        System.out.println(users.size());
        LOG.info("============================");
        System.out.println(users);
        UserListDetailsResponse userListDetailsResponse = new UserListDetailsResponse();

        List<UserResponse> userResponseList = new ArrayList<>();
        for (User user : users) {
            UserResponse userResponse = new UserResponse();
            userResponse.setUserId(user.getId());
            userResponse.setUserEmail(user.getEmail());
            userResponse.setUserName(user.getUserName());
            userResponse.setUserPhone(user.getMobileNumber());
            userResponse.setCreatedDate(user.getCreatedAt());

            userResponseList.add(userResponse);
        }
        userListDetailsResponse.setUsers(userResponseList);
        return ResponseEntity.ok(userListDetailsResponse);
    }

    @Override
    public ResponseEntity<UserResponse> fetchUserByUserName(String name) {

        User user = userRepository.findByUserName(name);
        if (null == user) {
            return ResponseEntity.notFound().build();
        }
        UserResponse userResponse = new UserResponse();
        userResponse.setUserName(user.getUserName());
        userResponse.setUserPhone(user.getMobileNumber());
        userResponse.setUserEmail(user.getEmail());
        userResponse.setRole(user.getRole());


        return ResponseEntity.ok(userResponse);

    }

    @Override
    public ResponseEntity<GenericResponse> registerNewUser( UserRegistrationRequest userRegistrationRequest) {
        GenericResponse response = new GenericResponse();
        try {

            String errorMsg = validationMsgWhileRegistering(userRegistrationRequest);

            if (null != errorMsg) {
                LOG.info("Invalid Request");
                response.setStatus(Boolean.FALSE.toString());
                response.setMessage("Please provide:" + errorMsg);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            User existingUserData = userRepository.findByUserName(userRegistrationRequest.getUserName());

            if (null != existingUserData) {
                LOG.info("Username already taken.");
                response.setMessage("Username already token");
                response.setStatus(Boolean.TRUE.toString());
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            User newUser = new User();
            newUser.setUserName(userRegistrationRequest.getUserName());
            newUser.setEmail(userRegistrationRequest.getEmail());
            newUser.setMobileNumber(userRegistrationRequest.getMobileNumber());
            newUser.setPassword(userRegistrationRequest.getPassword());
            newUser.setCreatedAt(new Date());
            newUser.setUpdatedAt(new Date());

            userRepository.save(newUser);

            response.setStatus(Boolean.TRUE.toString());
            response.setMessage("User created successfully.");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            LOG.error("Error while registering user:{}", e.getMessage());
            e.printStackTrace();

            response.setMessage("Error while registering user. Please try again in sometime");
            response.setStatus(Boolean.FALSE.toString());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(response);
        }

    }

    private String validationMsgWhileRegistering(UserRegistrationRequest userRegistrationRequest) {

        List<String> errorList = new ArrayList<>();
        if (StringUtils.isEmpty(userRegistrationRequest.getUserName())) errorList.add("username");
        if (StringUtils.isEmpty(userRegistrationRequest.getEmail())) errorList.add("email");
        if (StringUtils.isEmpty(userRegistrationRequest.getMobileNumber())) errorList.add("mobile number");
        if (StringUtils.isEmpty(userRegistrationRequest.getPassword())) errorList.add("password");

        return errorList.isEmpty() ? null : errorList.stream().collect(Collectors.joining(","));
    }
}
