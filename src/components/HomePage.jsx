import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1>INSTITUTE OF TECHNICAL EDUCATION AND RESEARCH</h1>
      <div className="sections">
        <div className="section" onClick={() => navigate("/notices")}>
          <h2>View Notices</h2>
          <p>Check out the latest updates and announcements.</p>
        </div>
        <div className="section" onClick={() => navigate("/holidays")}>
          <h2>View Holidays</h2>
          <p>Explore the list of holidays and vacation schedules.</p>
        </div>
        <div className="section" onClick={() => navigate("/selectrole")}>
          <h2>Select Role</h2>
          <p>Choose your role as a student or teacher to proceed.</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
// import React from "react";
// import { useNavigate } from "react-router-dom";
// //import "./HomePage.css";


// const Homepage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="container">
//       <h1>Welcome to College Management System</h1>
//       <button onClick={() => navigate("/notices")}>View Notices</button>
//       <button onClick={() => navigate("/holidays")}>View Holidays</button>
//       <button onClick={() => navigate("/selectrole")}>Select Role</button>
//     </div>
//   );
// };

// export default Homepage;
