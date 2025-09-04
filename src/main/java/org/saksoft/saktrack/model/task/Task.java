package org.saksoft.saktrack.model.task;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "task")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    private String sprintNo;
    private Date sprintStartDate;
    private Date sprintEndDate;
    private String taskId;
    private String taskName;
    private String taskDescription;
    private String taskType;
    private String storyPoints;
    private String taskProgress;
    private String taskPriority;
    private Date taskStartDate;
    private Date taskEndDate;

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
