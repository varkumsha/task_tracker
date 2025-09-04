package org.saksoft.saktrack.dto.response.task;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.saksoft.saktrack.dto.response.GenericResponse;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskListDetails extends GenericResponse {
    List<TaskDetails> tasks;
}
