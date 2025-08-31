import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobilNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateMobile = () => {
    if (mobileNumber === "") {
      setError("");
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      setError("Mobile number must be exactly 10 digits");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/auth/v1/register`, {
        userName,
        email,
        mobileNumber,
        password,
      });

      setSuccess("Registration successful! Please login.");
      setError("");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setError("Registration failed. Try again.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-sky-400 font-sans px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-center text-2xl font-bold text-blue-700 mb-6">
          Create Account ✨
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Mobile Number */}
        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,10}$/.test(value)) {
              setMobilNumber(value);
            }
          }}
          required
          pattern="\d{10}"
          onBlur={validateMobile}
          title="Mobile number must be 10 digits"
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Register
        </button>

        {/* Error/Success Messages */}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        {success && <p className="text-green-600 text-center mt-3">{success}</p>}

        {/* Redirect to Login */}
        <div className="text-center mt-4">
          <a
            href="/login"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Already have an account? Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
