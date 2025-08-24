package org.saksoft.saktrack.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.saksoft.saktrack.constants.Role;
import org.saksoft.saktrack.dto.response.GenericResponse;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserResponse extends GenericResponse {
    private Long userId;
    private String userName;
    private String userEmail;
    private String userPhone;
    private Role role;

    private Date createdDate;
    private Date lastLoginDate;
    private Date updatedDate;

}
