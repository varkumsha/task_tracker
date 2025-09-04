import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import Register from "./component/Register";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";
import Taskform from "./component/Taskform";
import TaskList from "./component/TaskList";
import Scheduler from "./component/Scheduler";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tempo" element={<TaskList />} />
                <Route path="/scheduler" element={<Scheduler />} />

            </Routes>
        </Router>
    );
}

export default App;
