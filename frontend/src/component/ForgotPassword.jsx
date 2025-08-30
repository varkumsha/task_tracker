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
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, rgb(36,72,129) 0%, rgb(92,165,198) 100%)",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "350px",
                    padding: "30px",
                    borderRadius: "16px",
                    background: "white",
                    boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
                    animation: "fadeIn 0.8s ease-in-out",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "20px",
                        color: "#0077b6",
                    }}
                >
                    Forgot Password 🔑
                </h2>

                <input
                    type="text"
                    placeholder="Enter Email or Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        marginBottom: "12px",
                        outline: "none",
                        fontSize: "15px",
                    }}
                />

                <button
                    type="submit"
                    style={{
                        background: "linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)",
                        color: "white",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.opacity = 0.9)}
                    onMouseOut={(e) => (e.target.style.opacity = 1)}
                >
                    Send Reset Link
                </button>

                {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "15px",
                        fontSize: "14px",
                    }}
                >
                    <a href="/login" style={{ color: "#0077b6", textDecoration: "none" }}>
                        Back to Login
                    </a>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
