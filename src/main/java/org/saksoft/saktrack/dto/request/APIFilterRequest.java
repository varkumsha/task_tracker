package org.saksoft.saktrack.dto.request;

import lombok.Data;

@Data
public class APIFilterRequest {

    private String key;
    private String value;
    private String operator;
}
