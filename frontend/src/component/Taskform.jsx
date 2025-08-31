import React, { useState } from "react";

const TaskForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    sprintNumber: "",
    sprintStart: "",
    sprintEnd: "",
    taskId: "",
    taskName: "",
    taskType: "Task",
    description: "",
    storyPoints: "",
    assignee: "",
    startDate: "",
    endDate: "",
    status: "To Do",
    progress: 0,
    priority: "Medium",
    spillOver: "No",
    dependencies: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Submitted:", formData);
    // Call API here to save formData
    if (closeModal) closeModal();
  };

  return (
    <div className="flex justify-center items-start p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
      >
        {/* Close Button */}
        {closeModal && (
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        )}

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Task / Bug Tracker
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium">Sprint Number</label>
            <input
              type="text"
              name="sprintNumber"
              value={formData.sprintNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Sprint Start</label>
            <input
              type="date"
              name="sprintStart"
              value={formData.sprintStart}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Sprint End</label>
            <input
              type="date"
              name="sprintEnd"
              value={formData.sprintEnd}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Task ID</label>
            <input
              type="text"
              name="taskId"
              value={formData.taskId}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Task Name</label>
            <input
              type="text"
              name="taskName"
              value={formData.taskName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Task Type</label>
            <select
              name="taskType"
              value={formData.taskType}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option>Task</option>
              <option>Story</option>
              <option>Bug</option>
              <option>Spike</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Story Points</label>
            <input
              type="number"
              name="storyPoints"
              value={formData.storyPoints}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Assignee</label>
            <input
              type="text"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>In Review</option>
              <option>Done</option>
              <option>Blocked</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Progress (%)</label>
            <input
              type="number"
              name="progress"
              value={formData.progress}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Spill Over</label>
            <select
              name="spillOver"
              value={formData.spillOver}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium">Dependencies</label>
            <input
              type="text"
              name="dependencies"
              value={formData.dependencies}
              onChange={handleChange}
              placeholder="Comma separated Task IDs"
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium">Comments</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="2"
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
