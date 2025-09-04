package org.saksoft.saktrack.service.task;

import org.saksoft.saktrack.dto.request.task.TaskGenerationRequest;
import org.saksoft.saktrack.dto.response.GenericResponse;
import org.saksoft.saktrack.dto.response.task.TaskDetails;
import org.saksoft.saktrack.dto.response.task.TaskListDetails;
import org.saksoft.saktrack.model.task.Task;
import org.saksoft.saktrack.repository.TaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Component
public class TaskServiceImpl implements TaskService {

    private final Logger LOGGER = LoggerFactory.getLogger(TaskServiceImpl.class);
    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public ResponseEntity<TaskListDetails> fetchTaskList(String authToken) {

        List<Task> taskList = taskRepository.findAll();

        if (CollectionUtils.isEmpty(taskList)) {
            TaskListDetails emptyResponse = new TaskListDetails();
            emptyResponse.setStatus("No Data found");
            emptyResponse.setMessage(Boolean.FALSE.toString());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(emptyResponse);
        }

        TaskListDetails taskListDetails = prepareTaskList(taskList);

        return ResponseEntity.status(HttpStatus.OK).body(taskListDetails);

    }


    private TaskListDetails prepareTaskList(List<Task> taskList) {
        TaskListDetails taskListDetails = new TaskListDetails();
        List<TaskDetails> taskDetails = new ArrayList<>();

        for (Task t : taskList) {
            TaskDetails task = getTaskDetails(t);

            taskDetails.add(task);
        }
        taskListDetails.setTasks(taskDetails);
        taskListDetails.setStatus(Boolean.TRUE.toString());
        taskListDetails.setMessage("Data Fetch Successfully!!");
        return taskListDetails;
    }

    private static TaskDetails getTaskDetails(Task t) {
        TaskDetails task = new TaskDetails();
        task.setSprintNo(t.getSprintNo());
        task.setSprintStartDate(t.getSprintStartDate());
        task.setSprintEndDate(t.getSprintEndDate());

        task.setTaskId(t.getTaskId());
        task.setTaskName(t.getTaskName());
        task.setTaskDescription(t.getTaskDescription());
        task.setTaskType(t.getTaskType());
        task.setParentTaskId(t.getParentTaskId());
        task.setParentTaskName(t.getParentTaskName());
        task.setParentTaskDescription(t.getParentTaskDescription());

        task.setStatus(t.getStatus());
        return task;
    }

    @Override
    public ResponseEntity<GenericResponse> createNewTask(String authToken, TaskGenerationRequest taskGenerationRequest) {

        Task newTask = new Task();
        newTask.setTaskId(taskGenerationRequest.getTaskId());
        newTask.setTaskName(taskGenerationRequest.getTaskName());
        newTask.setTaskDescription(taskGenerationRequest.getTaskDescription());
        newTask.setTaskType(taskGenerationRequest.getTaskType());
        newTask.setTaskStartDate(taskGenerationRequest.getTaskStartDate());

        newTask.setComments(taskGenerationRequest.getComments());

        newTask.setSpillOver(taskGenerationRequest.isSpillOver());
        newTask.setTaskProgress(taskGenerationRequest.getTaskProgress());
        newTask.setSprintStartDate(taskGenerationRequest.getTaskStartDate());
        newTask.setSprintEndDate(taskGenerationRequest.getTaskEndDate());

        newTask.setSprintNo(taskGenerationRequest.getSprintNo());


        taskRepository.save(newTask);
        return ResponseEntity.status(HttpStatus.OK).body(new GenericResponse("Task saved successfully", Boolean.TRUE.toString()));
    }
}
