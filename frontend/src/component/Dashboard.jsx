import React, {useEffect, useState} from "react";
import api from "../Api";
import Navbar from "./Navbar";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        api
            .post("https://task-tracker-1lxu.onrender.com/user/v1/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log("RESPONSE-START");
                console.log(res.data);
                console.log("RESPONSE-END");
                setUsers(res.data.users);
            })
            .catch((err) => {
                console.log("ERROR");
                console.log(err);
                setError("Failed to load users. Unauthorized?");
            });
    }, []);

    return (
        <div>

            <Navbar/>
            <div style={{margin: "40px"}}>
                <h2>User Dashboard</h2>

                {error && <p style={{color: "red"}}>{error}</p>}

                {users.length > 0 ? (
                    <table border="1" cellPadding="10" style={{borderCollapse: "collapse", width: "100%"}}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Mobile</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.userEmail}</td>
                                <td>{user.userName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
