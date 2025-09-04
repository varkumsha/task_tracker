package org.saksoft.saktrack.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.saksoft.saktrack.dto.request.task.TaskGenerationRequest;
import org.saksoft.saktrack.dto.response.GenericResponse;
import org.saksoft.saktrack.dto.response.task.TaskListDetails;
import org.saksoft.saktrack.service.task.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/task/v1")
public class TaskController {

    private final Logger LOGGER = LoggerFactory.getLogger(TaskController.class);

    final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/list")
    public ResponseEntity<TaskListDetails> fetchTaskList(@RequestHeader("Authorization") String authToken) {
        return taskService.fetchTaskList(authToken);
    }

    @PostMapping("/action/generate")
    @Operation(summary = "API to create a new task")
    public ResponseEntity<GenericResponse> createNewTask(@RequestHeader("Authorization") String authToken, @RequestBody TaskGenerationRequest taskGenerationRequest) {


        return taskService.createNewTask(authToken, taskGenerationRequest);
    }
}
