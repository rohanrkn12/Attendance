import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/Homepage";
import SelectRole from "./components/SelectRole";
import StudentLogin from "./components/StudentLogin";
import TeacherLogin from "./components/TeacherLogin";
import StudentDashboard from "./components/StudentDashboard";
import AttendanceUpdate from "./components/AttendanceUpdate";
import NoticeBoard from "./components/NoticeBoard";
import Holidays from "./components/Holidays";
import "./App.css";
import image from "./assets/images/image.jpg";

const App = () => {
  const [studentData, setStudentData] = useState(null);
  const [teacherData, setTeacherData] = useState(null);

  const backgroundStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
  };

  return (
    <div style={backgroundStyle}>
      <div className="app-content">
        <Router>
          <Routes>
            {/* Homepage */}
            <Route path="/" element={<Homepage />} />

            {/* Notices and Holidays */}
            <Route path="/notices" element={<NoticeBoard />} />
            <Route path="/holidays" element={<Holidays />} />

            {/* Select Role */}
            <Route path="/selectrole" element={<SelectRole />} />

            {/* Student Flow */}
            <Route
              path="/student-login"
              element={<StudentLogin setStudentData={setStudentData} />}
            />
            <Route
              path="/student-dashboard"
              element={
                studentData ? (
                  <StudentDashboard student={studentData} />
                ) : (
                  <Navigate to="/student-login" />
                )
              }
            />

            {/* Teacher Flow */}
            <Route
              path="/teacher-login"
              element={<TeacherLogin setTeacherData={setTeacherData} />}
            />
            <Route
              path="/attendance-update"
              element={
                teacherData ? (
                  <AttendanceUpdate teacher={teacherData} />
                ) : (
                  <Navigate to="/teacher-login" />
                )
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;


