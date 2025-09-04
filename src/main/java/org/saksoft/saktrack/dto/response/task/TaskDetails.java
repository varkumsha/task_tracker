package org.saksoft.saktrack.dto.response.task;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskDetails {
    private String sprintNo;
    private Date sprintStartDate;
    private Date sprintEndDate;
    private String taskId;
    private String taskName;
    private String taskDescription;
    private String taskType;
    private String storyPoints;
    private String taskProgress;
    private String parentTaskId;
    private String parentTaskName;
    private String parentTaskDescription;
    private String status;
    private boolean isSpillOver;
    private String comments;
    private Date createdAt;
    private Date updatedAt;
    private String createdBy;
    private String updatedBy;
}
