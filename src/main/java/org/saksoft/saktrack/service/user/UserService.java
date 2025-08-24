package org.saksoft.saktrack.service.user;

import org.saksoft.saktrack.dto.request.user.UserDetailsRequest;
import org.saksoft.saktrack.dto.response.user.UserListDetailsResponse;
import org.saksoft.saktrack.dto.response.user.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    ResponseEntity<UserListDetailsResponse> fetchAllUsers(UserDetailsRequest request);
//
//    UserResponse fetchUserById(Long id);
//
    ResponseEntity<UserResponse> fetchUserByUserName(String userName);
//
//    GenericResponse createNewUser(User user);
//
//    GenericResponse updateUser(User user);

}
