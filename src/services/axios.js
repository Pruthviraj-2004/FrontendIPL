// src/api/axios.js  (or services/axios.js)
import axios from "axios";

const api = axios.create({
  baseURL: "https://predictiveplaybackendpractice.pythonanywhere.com",
  withCredentials: true, // 🔥 ADD HERE
});

export default api;
