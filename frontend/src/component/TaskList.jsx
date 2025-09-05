import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import api from "../Api";
import API_BASE_URL from "../config";
import * as XLSX from "xlsx";
import { useReactToPrint } from "react-to-print";
import TaskForm from "./Taskform";
import { FaFileExcel, FaPlus, FaPrint } from "react-icons/fa";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState({ sprint: "", status: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const tasksPerPage = 10;

  const tableRef = useRef();

  useEffect(() => {
    fetchTasks();
  }, []);

  function showToast(message, type = "success") {
    const toastContainer = document.getElementById("toast-container");

    const toast = document.createElement("div");
    toast.className = `mb-2 px-4 py-2 rounded-lg shadow-lg text-white
    ${type === "success" ? "bg-green-500" : "bg-red-500"}
    animate-fade-in-out`;

    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  const fetchTasks = () => {
    const token = localStorage.getItem("token");

    api
      .get(`${API_BASE_URL}/task/v1/list`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTasks(res.data.tasks || []);
        setFilteredTasks(res.data.tasks || []);
        showToast(`✅ Success | Status: ${res.data.message}`);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 403) {
          showToast(`FORBIDDEN`);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          showToast(`❌ Error | Status: ${err.response?.status}`);
        }
      });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilter = { ...filter, [name]: value };
    setFilter(updatedFilter);

    const filtered = tasks.filter((task) => {
      return (
        (updatedFilter.sprint ? task.sprintNumber === updatedFilter.sprint : true) &&
        (updatedFilter.status ? task.status === updatedFilter.status : true)
      );
    });
    setFilteredTasks(filtered);
    setCurrentPage(1);
  };

  const handleExportExcel = () => {
    const exportData = filteredTasks.map((task) => ({
      sprintNumber: task.sprintNumber,
      taskId: task.taskId,
      taskName: task.taskName,
      description: task.description,
      storyPoints: task.storyPoints,
      taskType: task.taskType,
      endDate: task.endDate,
      status: task.status,
      progress: task.progress,
      spillOver: task.spillOver,
      comments: task.comments,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData, {
      header: [
        "sprintNumber",
        "taskId",
        "taskName",
        "description",
        "storyPoints",
        "taskType",
        "endDate",
        "status",
        "progress",
        "spillOver",
        "comments",
      ],
    });

    const headerRow = [
      "Sprint #",
      "Task ID",
      "Task Name",
      "Description",
      "Story Points",
      "Task/Bug",
      "End Date",
      "Status",
      "Progress",
      "Spill Over",
      "Comments",
    ];
    XLSX.utils.sheet_add_aoa(ws, [headerRow], { origin: "A1" });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tasks");
    XLSX.writeFile(wb, "tasks.xlsx");
  };

  const handlePrint = useReactToPrint({ content: () => tableRef.current });

  const indexOfLast = currentPage * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="md:ml-56 p-4">
        {/* Task Table */}
        <div
          ref={tableRef}
          className="w-full mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Tasks List</h2>
          </div>

          {statusMessage && (
            <div
              className={`mb-4 p-3 rounded font-semibold ${statusMessage.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
                }`}
            >
              {statusMessage}
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Filter by Sprint"
              name="sprint"
              value={filter.sprint}
              onChange={handleFilterChange}
              className="border rounded px-3 py-2"
            />
            <select
              name="status"
              value={filter.status}
              onChange={handleFilterChange}
              className="border rounded px-3 py-2"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              onClick={handleExportExcel}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              <FaFileExcel></FaFileExcel>
            </button>
            <button
              onClick={handlePrint}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              <FaPrint></FaPrint>
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
            >
              <FaPlus></FaPlus>
            </button>
          </div>

          {/* ✅ Table with min-w-full */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Sprint #</th>
                  <th className="border p-2">Sprint Start Date</th>
                  <th className="border p-2">Sprint End Date</th>
                  <th className="border p-2">Task ID</th>
                  <th className="border p-2">Task Name</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Story Points</th>
                  <th className="border p-2">Type</th>
                  <th className="border p-2">End Date</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Progress</th>
                  <th className="border p-2">Spill Over</th>
                  <th className="border p-2">Comments</th>
                </tr>
              </thead>
              <tbody>
                {currentTasks.map((task) => (
                  <tr key={task.taskId} className="hover:bg-gray-50 transition">
                    <td className="border p-2">{task.sprintNo}</td>
                    <td className="border p-2">{task.sprintStartDate}</td>
                    <td className="border p-2">{task.sprintEndDate}</td>
                    <td className="border p-2">{task.taskId}</td>
                    <td className="border p-2">{task.taskName}</td>
                    <td className="border p-2">{task.taskDescription}</td>
                    <td className="border p-2">{task.storyPoints}</td>
                    <td className="border p-2">{task.taskType}</td>
                    <td className="border p-2">{task.endDate}</td>
                    <td className="border p-2">{task.status}</td>
                    <td className="border p-2">{task.taskProgress}</td>
                    <td className="border p-2">{task.spillOver}</td>
                    <td className="border p-2">{task.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-white"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <TaskForm
              onSuccess={() => {
                setShowModal(false);
                fetchTasks();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
