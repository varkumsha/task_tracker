package org.saksoft.saktrack.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.saksoft.saktrack.constants.Role;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserResponse {
    private Long userId;
    private String userName;
    private String userEmail;
    private String userPhone;
    private String isUserActive;
    private Role role;

    private Date createdDate;
    private Date lastLoginDate;
    private Date updatedDate;

}
