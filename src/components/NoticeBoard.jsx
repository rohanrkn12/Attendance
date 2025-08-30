// src/components/NoticeBoard.jsx
import React, { useEffect, useState } from "react";
import { fetchNotices } from "../api/api";
import "./NoticeBoard.css";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const loadNotices = async () => {
      const data = await fetchNotices();
      setNotices(data);
    };
    loadNotices();
  }, []);

  return (
    <div className="container">
      <h2>Notice Board</h2>
      <ul>
        {notices.map((notice, index) => (
          <li key={index}>
            <h4>{notice.title}</h4>
            <p>{notice.notice_description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeBoard;
