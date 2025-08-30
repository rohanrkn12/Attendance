import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentLogin } from "../api/api";

const StudentLogin = ({ setStudentData }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await studentLogin(identifier, password);
      setStudentData(data.student);
      navigate("/student-dashboard");
    } catch (err) {
      setError("Invalid registration number or password.");
    }
  };

  return (
    <div className="container">
      <h2>Student Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Registration Number"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default StudentLogin;



