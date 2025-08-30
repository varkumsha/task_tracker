package org.saksoft.saktrack.dto.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class GenericResponse {
    private String message;
    private String status;
}
