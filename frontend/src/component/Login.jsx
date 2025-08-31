import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/v1/login`, {
        userName,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setError("");
      setSuccess("Logged-in successful!");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 to-sky-400 font-sans">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-80 sm:w-96 p-6 sm:p-8 rounded-2xl bg-white shadow-xl animate-fadeIn"
      >
        <h2 className="text-center mb-6 text-blue-600 text-2xl font-bold">
          Welcome Back 👋
        </h2>

        <input
          type="text"
          placeholder="Email or Mobile"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          className="p-3 rounded-lg border border-gray-300 mb-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 rounded-lg border border-gray-300 mb-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-3 rounded-lg text-lg font-semibold transition hover:opacity-90"
        >
          Login
        </button>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        {success && <p className="text-green-500 text-center mt-3">{success}</p>}

        <div className="flex justify-between mt-4 text-sm">
          <a
            href="/register"
            className="text-blue-600 hover:underline transition"
          >
            Register
          </a>
          <a
            href="/forgot-password"
            className="text-blue-600 hover:underline transition"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
