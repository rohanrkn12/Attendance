import React from "react";
import { useNavigate } from "react-router-dom";
//import "./SelectRole.css";

const SelectRole = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Select Role</h2>
      <button onClick={() => navigate("/student-login")}>Student</button>
      <button onClick={() => navigate("/teacher-login")}>Teacher</button>
    </div>
  );
};

export default SelectRole;
