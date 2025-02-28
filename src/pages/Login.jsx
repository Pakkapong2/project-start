import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../http-common"; // ใช้ http-common.js ที่เราสร้าง
import logo from "../images/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      console.log("✅ Login Successful:", response.data);
      localStorage.setItem("token", response.data.token); // เก็บ token
      localStorage.setItem("user", JSON.stringify(response.data.user)); // เก็บข้อมูลผู้ใช้
      navigate("/"); // ไปหน้า Dashboard
    } catch (err) {
      console.error("❌ Login Error:", err);
      setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="w-full bg-blue-600 py-4 px-6 flex items-center">
        <img src={logo} alt="Logo" className="w-12 h-12 mr-3" />
        <h1 className="text-white text-lg font-semibold">
          CTB Reserve a Car Online
        </h1>
      </div>

      {/* กล่อง Login */}
      <div className="flex flex-grow items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-4">LOGIN</h2>
          {error && <p className="text-red-500 text-center mb-3">{error}</p>}
          <input
            className="w-full p-2 mb-3 border rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="text"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-2 mb-3 border rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="#" className="text-sm text-blue-500 hover:underline">
            Forgot your password?
          </Link>
          <button
            className="w-full p-2 bg-blue-600 text-white rounded mt-3 hover:bg-blue-700 transition"
            onClick={handleLogin}
          >
            Login
          </button>
          <Link
            to="/register"
            className="block text-center text-blue-500 mt-3 hover:underline"
          >
            Apply for membership
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;