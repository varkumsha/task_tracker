package org.saksoft.saktrack.dto.request.user;

import org.saksoft.saktrack.dto.request.APIFilterRequest;
import lombok.Data;

import java.util.List;

@Data
public class UserDetailsRequest {
    private List<APIFilterRequest> filters;
}
