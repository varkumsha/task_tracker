package org.saksoft.saktrack.dto.request.user;

import org.saksoft.saktrack.dto.request.APIFilterRequest;

import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsRequest{
    private List<APIFilterRequest> filters;
}
