import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // clear JWT
        navigate("/"); // redirect to login
    };

    return (
        <nav style={styles.nav}>
            <h3 style={styles.logo}>FlowTracker</h3>
            <ul style={styles.menu}>
                <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
                <li><button onClick={handleLogout} style={styles.logout}>Logout</button></li>
            </ul>
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background:  "linear-gradient(135deg, rgb(36,72,129) 0%, rgb(92,165,198) 100%)",
        color: "white",
        padding: "10px 20px"
    },
    logo: { margin: 0 },
    menu: {
        listStyle: "none",
        display: "flex",
        gap: "15px",
        margin: 0,
        padding: 0
    },
    link: { color: "white", textDecoration: "none" },
    logout: {
        background: "red",
        color: "white",
        border: "none",
        padding: "5px 10px",
        cursor: "pointer"
    }
};

export default Navbar;
