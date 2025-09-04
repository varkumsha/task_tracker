package org.saksoft.saktrack.dto.request.task;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskGenerationRequest {

    private String sprintNo;
    private Date sprintStartDate;
    private Date sprintEndDate;

    private String taskId;
    private String taskName;
    private String taskDescription;
    private String taskType;
    private String storyPoints;

    private Date taskStartDate;
    private Date taskEndDate;
    private String status;
    private String taskProgress;

    private String taskPriority;
    private boolean isSpillOver;

    private String comments;
}
