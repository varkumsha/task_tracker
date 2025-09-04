import React, { useEffect, useState } from "react";
import api from "../Api";
import Navbar from "./Navbar";
import API_BASE_URL from "../config";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

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
        console.log("RESPONSE-START", res.data, "RESPONSE-END");
        setUsers(res.data.users || []);
      })
      .catch((err) => {
        console.error("ERROR", err);
        setError("⚠️ Failed to load users. Unauthorized?");
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
        <div className="md:ml-56 p-4">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">User Dashboard</h2>
          </div>

        <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-xl shadow-lg">


          {error && (
            <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
          )}

          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border text-left">ID</th>
                    <th className="p-3 border text-left">Email</th>
                    <th className="p-3 border text-left">Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.userId}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="p-3 border">{user.userId}</td>
                      <td className="p-3 border">{user.userEmail}</td>
                      <td className="p-3 border">{user.userName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
