import { useEffect, useRef, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import api from "../Api";
import API_BASE_URL from "../config";
import Navbar from "./Navbar";
import { useToast } from "./ToastContext";

// Simple modal component
const Modal = ({ isOpen, onClose, onSubmit, user }) => {
  const [form, setForm] = useState({
    userName: user?.userName || "",
    userEmail: user?.userEmail || "",
    userPhone: user?.userPhone || "",
    isUserActive: user?.isUserActive || true,
  });

  useEffect(() => {
    if (user) {
      setForm({
        userName: user.userName,
        userEmail: user.userEmail,
        userPhone: user.userPhone,
        isUserActive: user.isUserActive,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {user ? "Edit User" : "Create User"}
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            value={form.userName}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            type="email"
            name="userEmail"
            placeholder="Email"
            value={form.userEmail}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="userPhone"
            placeholder="Mobile"
            value={form.userPhone}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <select
            name="isUserActive"
            value={form.isUserActive}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            {user ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const showToast = useToast();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // Only close if click is outside any menu container
      if (!event.target.closest(".action-menu")) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    api
      .post(
        `${API_BASE_URL}/user/v1/users`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        showToast(`${res.data.message}`);
        setUsers(res.data.users || []);
        setFilteredUsers(res.data.users || []);
      })
      .catch((err) => {
        if (err.response?.status === 403) {
          showToast(`FORBIDDEN`);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          showToast(`❌ Error | Status: ${err.response?.status}`);
        }
      });
  }, []);

  const handleCreateUser = (form) => {
    console.log("Create user", form);
    showToast("✅ User created (stubbed)");
  };

  const handleEditUser = (form) => {
    console.log("Update user", form);
    showToast("✏️ User updated (stubbed)");
  };

  const handleDeleteUser = (user) => {
    console.log("Delete user", user);
    showToast("🗑️ User deleted (stubbed)");
  };

  const handleDeactivateUser = (user) => {
    console.log("Deactivate user", user);
    showToast("🚫 User deactivated (stubbed)");
  };

  const indexOfLast = currentPage * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / tasksPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="md:ml-56 p-4">
        <div className="w-full mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              User Dashboard
            </h2>
            <button
              onClick={() => {
                setEditingUser(null);
                setIsModalOpen(true);
              }}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-green-600"
            >
              + Create User
            </button>
          </div>
          {error && (
            <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
          )}

          {currentUsers.length > 0 ? (
            <div className="overflow-x-auto overflow-visible">
              <table className="w-full border border-gray-200 rounded-lg relative">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border text-center">ID</th>
                    <th className="p-3 border text-center">User Name</th>
                    <th className="p-3 border text-center">Email</th>
                    <th className="p-3 border text-center">Mobile</th>
                    <th className="p-3 border text-center">Active</th>
                    <th className="p-3 border text-center">Created Date</th>
                    <th className="p-3 border text-center">Updated Date</th>
                    <th className="p-3 border text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr
                      key={user.userId}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="p-3 border text-center">{user.userId}</td>
                      <td className="p-3 border text-center">{user.userName}</td>
                      <td className="p-3 border text-center">{user.userEmail}</td>
                      <td className="p-3 border text-center">{user.userPhone}</td>
                      <td className="p-3 border text-center">
                        {user.isUserActive ? "Yes" : "No"}
                      </td>
                      <td className="p-3 border">{user.createdDate}</td>
                      <td className="p-3 border">{user.updatedDate}</td>
                      <td className="p-3 border text-center relative">
                        <div className="inline-block action-menu">
                          <button
                            className="p-2 hover:bg-gray-100 rounded-full"
                            onClick={() =>
                              setOpenMenuId(openMenuId === user.userId ? null : user.userId)
                            }
                          >
                            <FaEllipsisV className="h-5 w-5" />
                          </button>

                          {openMenuId === user.userId && (
                            <div className="absolute right-0 top-full mt-1 w-36 bg-white border rounded shadow-lg z-50">
                              <button
                                onClick={() => {
                                  setEditingUser(user);
                                  setIsModalOpen(true);
                                  setOpenMenuId(null);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  handleDeactivateUser(user);
                                  setOpenMenuId(null);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                Deactivate
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteUser(user);
                                  setOpenMenuId(null);
                                }}
                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
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
          ) : (
            <p className="text-center text-gray-500 mt-6">No users found.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingUser ? handleEditUser : handleCreateUser}
        user={editingUser}
      />
    </div>
  );
};

export default Dashboard;
