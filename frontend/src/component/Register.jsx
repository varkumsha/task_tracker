import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const Register = () => {
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/v1/register`, {
                name,
                userName,
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
                    Create Account ✨
                </h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

                <input
                    type="text"
                    placeholder="Email or Mobile"
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

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    Register
                </button>

                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "15px",
                        fontSize: "14px",
                    }}
                >
                    <a href="/login" style={{ color: "#0077b6", textDecoration: "none" }}>
                        Already have an account? Login
                    </a>
                </div>
            </form>
        </div>
    );
};

export default Register;
