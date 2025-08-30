import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5174", // Your backend server URL
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
