import React, { useEffect, useState } from "react";
import api from "../Api";
import Navbar from "./Navbar";
import API_BASE_URL from "../config";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        api.post(
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
        <div>
            <Navbar />
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px"
            }}>
                <div style={{
                    width: "90%",
                    maxWidth: "900px",
                    background: "#fff",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}>
                    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                        User Dashboard
                    </h2>

                    {error && (
                        <p style={{
                            color: "red",
                            textAlign: "center",
                            marginBottom: "20px"
                        }}>
                            {error}
                        </p>
                    )}

                    {users.length > 0 ? (
                        <table style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            textAlign: "left",
                            border: "1px solid #ddd"
                        }}>
                            <thead>
                            <tr style={{ backgroundColor: "#f5f5f5" }}>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Mobile</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user.userId}>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                        {user.userId}
                                    </td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                        {user.userEmail}
                                    </td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                        {user.userName}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ textAlign: "center", marginTop: "20px" }}>
                            No users found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
