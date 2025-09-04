package org.saksoft.saktrack.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import org.saksoft.saktrack.dto.response.GenericResponse;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserListDetailsResponse extends GenericResponse{
    List<UserResponse> users;
}
