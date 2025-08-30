// src/api/api.js
import axios from "axios";

const API_BASE = "http://localhost:3000/api";

export const studentLogin = async (identifier, password) => {
  const response = await axios.post(`${API_BASE}/student-login`, { identifier, password });
  return response.data;
};

export const teacherLogin = async (identifier, password) => {
  const response = await axios.post(`${API_BASE}/teacher-login`, { identifier, password });
  return response.data;
};

export const fetchNotices = async () => {
  const response = await axios.get(`${API_BASE}/notices`);
  return response.data;
};

export const fetchHolidays = async () => {
  const response = await axios.get(`${API_BASE}/holidays`);
  return response.data;
};

export const updateAttendance = async (teacherId, subject, updates) => {
  const response = await axios.post(`${API_BASE}/update-attendance`, { teacherId, subject, updates });
  return response.data;
};
