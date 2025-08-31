import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Extract token from URL
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/v1/reset-password`, {
        token,
        newPassword: password,
      });

      setMessage(response.data.message || "Password reset successful!");
      setTimeout(() => navigate("/login"), 2000); // redirect to login after 2 sec
    } catch (err) {
      setError("Unable to reset password. The link may have expired.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-400 font-sans">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-80 sm:w-96 bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-center text-2xl font-semibold mb-6 text-blue-600">
          Reset Password 🔒
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 rounded-lg border border-gray-300 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="p-3 rounded-lg border border-gray-300 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-3 rounded-lg font-bold text-base transition-transform transform hover:scale-105"
        >
          Change Password
        </button>

        {message && <p className="text-green-600 text-center mt-3">{message}</p>}
        {error && <p className="text-red-600 text-center mt-3">{error}</p>}

        <div className="flex justify-center mt-4 text-sm">
          <a href="/login" className="text-blue-600 hover:underline">
            Back to Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
