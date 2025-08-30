import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { teacherLogin } from "../api/api";

const TeacherLogin = ({ setTeacherData }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await teacherLogin(identifier, password);
      setTeacherData(data.teacher);
      navigate("/attendance-update");
    } catch (err) {
      setError("Invalid teacher ID or password.");
    }
  };

  return (
    <div className="container">
      <h2>Teacher Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Teacher ID"
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

export default TeacherLogin;


