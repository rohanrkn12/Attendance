// src/components/StudentDashboard.jsx
import React from "react";
import "./StudentDashboard.css";
const StudentDashboard = ({ student }) => {
  return (
    <div className="container">
      <h2>Welcome, {student.name}</h2>
      <h3>Attendance</h3>
      <ul>
        {Object.entries(student.attendance).map(([subject, attendance]) => (
          <li key={subject}>
            {subject}: {attendance}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
