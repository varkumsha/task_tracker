// src/components/Scheduler.js
import React, { useState } from "react";
import Navbar from "./Navbar";
import API_BASE_URL from "../config";

export default function Scheduler() {
  const [form, setForm] = useState({
    mailTo: "",
    cc: "",
    mailSubject: "",
    mailContent: "",
    filter: "",
    scheduleDateTime: "",
    teamName: "NO",
    isSendImmediately: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User is not logged in.");
        return;
      }

      console.log(JSON.stringify(form));
      const response = await fetch(`${API_BASE_URL}/email/v1/template/sent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to send mail");
      }

      const data = await response.json();
      setMessage(data.message || "Mail scheduled/sent successfully!");
    } catch (err) {
      setError(err.message || "Error sending mail");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Scheduler - Timesheet Sender</h1>

        {/* Info messages */}
        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md"
        >
          {/* Email Fields */}
          <div>
            <label className="block font-medium mb-2">To</label>
            <input
              type="email"
              name="mailTo"
              value={form.mailTo}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-2">CC</label>
            <input
              type="email"
              name="cc"
              value={form.cc}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Subject */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-2">Subject</label>
            <input
              type="text"
              name="mailSubject"
              value={form.mailSubject}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Content */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-2">Content</label>
            <textarea
              name="mailContent"
              value={form.mailContent}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 h-28"
              required
            />
          </div>

          {/* Filter */}
          <div>
            <label className="block font-medium mb-2">Filter (Dept/Team)</label>
            <input
              type="text"
              name="filter"
              value={form.filter}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              placeholder="Ex: Team A, QA, Dev"
            />
          </div>

          {/* Schedule Time */}
          <div>
            <label className="block font-medium mb-2">Schedule Time</label>
            <input
              type="datetime-local"
              name="scheduleDateTime"
              value={form.scheduleDateTime}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Send Now */}
          <div className="flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              name="isSendImmediately"
              checked={form.isSendImmediately}
              onChange={handleChange}
            />
            <label>Send Immediately</label>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Submit
            </button>
            <button
              type="reset"
              className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-lg"
              onClick={() =>
                setForm({
                  to: "",
                  cc: "",
                  subject: "",
                  content: "",
                  filter: "",
                  scheduleDateTime: "",
                  isSendImmediately: false,
                })
              }
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
