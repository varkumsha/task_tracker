import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://task-tracker-1lxu.onrender.com/auth/v1/login", {
                userName,
                password,
            });

            // backend should return JWT token in response.data.token
            localStorage.setItem("token", response.data.token);

            // alert("Login successful!");
            window.location.href = "/dashboard"; // redirect to dashboard
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "300px",
                    gap: "15px",
                    border: "1px solid #ccc",
                    padding: "20px",
                    borderRadius: "8px",
                }}
            >
                <h2 style={{ textAlign: "center" }}>Login</h2>

                <input
                    type="text"
                    placeholder="Email or Mobile"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
