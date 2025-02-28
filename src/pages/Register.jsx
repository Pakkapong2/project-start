import { Link } from "react-router-dom";
import logo from "../images/logo.png";

function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full h-[50px] bg-blue-600 flex items-center justify-between px-6 shadow-md">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
          <h1 className="text-white text-lg font-semibold">
            CTB Reserve a Car Online
          </h1>
        </div>
        <Link
          to="/login"
          className="px-4 py-1 bg-white text-blue-600 rounded hover:bg-gray-200"
        >
          Login
        </Link>
      </div>

      {/* Register Box */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 mt-10">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <input
          className="w-full p-2 mb-2 border rounded bg-gray-200"
          type="text"
          placeholder="First and last name"
        />
        <input
          className="w-full p-2 mb-2 border rounded bg-gray-200"
          type="email"
          placeholder="Email"
        />

        {/* Row: Phone Number + Date of Birth */}
        <div className="flex gap-2">
          <input
            className="w-1/2 p-2 border rounded bg-gray-200"
            type="text"
            placeholder="Phone number"
          />
          <input className="w-1/2 p-2 border rounded bg-gray-200" type="date" />
        </div>

        <input
          className="w-full p-2 mt-2 border rounded bg-gray-200"
          type="password"
          placeholder="Password"
        />
        <input
          className="w-full p-2 mt-2 border rounded bg-gray-200"
          type="password"
          placeholder="Confirm password"
        />

        <button className="w-full p-2 bg-blue-600 text-white rounded mt-4 hover:bg-blue-700 transition">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
