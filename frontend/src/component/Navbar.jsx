import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaHome,
  FaRegClock,
  FaChartBar,
  FaCog,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-56 flex flex-col justify-between p-5 transition-colors duration-300
        ${darkMode ? "bg-gray-900 text-white" : "bg-blue-900 text-white"}`}
    >
      {/* Logo */}
      <h2 className="text-xl font-bold mb-6">FlowTracker</h2>

      {/* Navigation Links */}
      <ul className="flex flex-col gap-5">
        <li>
          <Link to="/dashboard" className="flex items-center gap-3 hover:text-yellow-400 transition">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/tempo" className="flex items-center gap-3 hover:text-yellow-400 transition">
            <FaRegClock /> Tempo
          </Link>
        </li>
        <li>
          <Link to="/reports" className="flex items-center gap-3 hover:text-yellow-400 transition">
            <FaChartBar /> Reports
          </Link>
        </li>
        <li>
          <Link to="/settings" className="flex items-center gap-3 hover:text-yellow-400 transition">
            <FaCog /> Settings
          </Link>
        </li>
      </ul>

      {/* Profile Section */}
      <div
        className="relative mt-auto pb-3"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <FaUserCircle size={40} className="cursor-pointer text-white" />

        {showDropdown && (
          <div className="absolute bottom-14 left-0 bg-white text-black rounded-lg shadow-lg py-2 w-40 z-50">
            <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</p>
            <p
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </p>
            <p
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
