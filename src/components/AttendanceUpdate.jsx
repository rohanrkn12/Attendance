//AttendenceUpdate.jsx


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AttendanceUpdate.css";
const AttendanceUpdate = ({ teacher }) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch students list
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/students");
        setStudents(response.data);
        const initialAttendance = response.data.reduce((acc, student) => {
          acc[student.id] = student[`${teacher.subject}_attendance`] || 0;
          return acc;
        }, {});
        setAttendance(initialAttendance);
      } catch (error) {
        console.error("Error fetching students:", error.message);
        setErrorMessage("Failed to fetch students.");
      }
    };
    fetchStudents();
  }, [teacher.subject]);

  const handleAttendanceChange = (studentId, value) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const submitAttendance = async () => {
    try {
      await axios.post("http://localhost:3000/api/update-attendance", {
        teacherId: teacher.id,
        subject: teacher.subject,
        updates: attendance,
      });
      setSuccessMessage("Attendance updated successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating attendance:", error.message);
      setErrorMessage("Failed to update attendance. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="attendance-update">
      <h2>Update Attendance for {teacher.subject}</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Registration Number</th>
            <th>Attendance (%)</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.registration_number}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={attendance[student.id] || ""}
                  onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={submitAttendance} className="update-button">
        Update Attendance
      </button>
    </div>
  );
};

export default AttendanceUpdate;
