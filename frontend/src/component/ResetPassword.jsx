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
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "20px",
                        color: "#0077b6",
                    }}
                >
                    Reset Password 🔒
                </h2>

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        marginBottom: "12px",
                        fontSize: "15px",
                    }}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        marginBottom: "12px",
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
                >
                    Change Password
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

export default ResetPassword;
