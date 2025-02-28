import axios from "axios";

export default axios.create({
  baseURL: "https://project-server-zvjt.onrender.com/api", // ✅ ตรวจสอบให้ถูกต้อง
  headers: { "Content-Type": "application/json" }
});
