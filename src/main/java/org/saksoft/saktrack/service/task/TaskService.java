package org.saksoft.saktrack.service.task;

import org.saksoft.saktrack.dto.request.task.TaskGenerationRequest;
import org.saksoft.saktrack.dto.response.GenericResponse;
import org.saksoft.saktrack.dto.response.task.TaskListDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface TaskService {
    ResponseEntity<TaskListDetails> fetchTaskList(String authToken);

    ResponseEntity<GenericResponse> createNewTask(String authToken, TaskGenerationRequest taskGenerationRequest);
}
