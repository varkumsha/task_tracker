import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const ForgotPassword = () => {
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth/v1/forgot-password`,
                { userName }
            );
            setMessage(response.data.message || "Password reset link sent to your email.");
        } catch (err) {
            setError("Unable to process request. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#244881] to-[#5ca5c6] font-sans">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full max-w-md bg-white p-8 rounded-2xl shadow-lg animate-fadeIn"
            >
                <h2 className="text-center mb-6 text-2xl font-semibold text-[#0077b6]">
                    Forgot Password 🔑
                </h2>

                <input
                    type="text"
                    placeholder="Enter Email or Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="p-3 rounded-lg border border-gray-300 mb-4 outline-none text-base focus:ring-2 focus:ring-blue-400"
                />

                <button
                    type="submit"
                    className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white p-3 rounded-lg font-bold text-lg transition hover:opacity-90"
                >
                    Send Reset Link
                </button>

                {message && <p className="text-green-600 text-center mt-3">{message}</p>}
                {error && <p className="text-red-600 text-center mt-3">{error}</p>}

                <div className="flex justify-center mt-4 text-sm">
                    <a href="/login" className="text-[#0077b6] hover:underline">
                        Back to Login
                    </a>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
