package org.saksoft.saktrack.service.user;

import org.saksoft.saktrack.dto.request.user.UserDetailsRequest;
import org.saksoft.saktrack.dto.response.user.UserListDetailsResponse;
import org.saksoft.saktrack.dto.response.user.UserResponse;
import org.saksoft.saktrack.model.User;
import org.saksoft.saktrack.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

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
}
