import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.png";
import car from "../images/car.jpg";
import { FaUserCircle } from "react-icons/fa";

function HomePage() {
  const [bookingId, setBookingId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [user, setUser] = useState(null); // เก็บข้อมูลผู้ใช้
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // 📌 ดึงข้อมูลผู้ใช้จาก Backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:4000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("User Data:", response.data); // Debug
        setUser(response.data); // เซ็ตข้อมูลผู้ใช้
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSearch = () => {
    navigate("/car-rental");
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // ลบ Token ออกจาก localStorage
    navigate("/login"); // กลับไปหน้า Login
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="bg-blue-600 text-white flex items-center justify-between p-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12 mr-4" />
          <h1 className="text-2xl font-semibold">CTB Reserve a Car Online</h1>
        </div>

        {/* Profile Dropdown */}
        <div className="relative flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm">{user.name}</span> {/* แสดงชื่อผู้ใช้ */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="focus:outline-none"
              >
                <FaUserCircle className="w-10 h-10 text-white" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-12 right-0 w-48 bg-white rounded shadow-lg z-50">
                  <ul className="text-black">
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => navigate("/profile")}
                    >
                      ข้อมูลส่วนตัว
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => navigate("/forgot-password")}
                    >
                      ลืมรหัสผ่าน
                    </li>
                    <li
                      className="px-4 py-2 text-red-500 hover:bg-gray-200 cursor-pointer"
                      onClick={handleLogout}
                    >
                      ออกจากระบบ
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <button onClick={() => navigate("/login")} className="text-sm">
              เข้าสู่ระบบ
            </button>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[90vh] flex items-center justify-center">
        <img
          src={car}
          alt="Car Rental"
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
        />
        <div className="relative text-center text-white">
          <h2 className="text-3xl font-bold mb-4">ค้นหารถเช่าที่คุณต้องการ</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="จุดรับ-คืนรถ"
                className="p-2 border rounded bg-gray-100 w-full"
              />
              <input
                type="date"
                className="p-2 border rounded bg-gray-100 w-full text-black placeholder-gray-500"
              />
              <input
                type="date"
                className="p-2 border rounded bg-gray-100 w-full text-black placeholder-gray-500"
              />
            </div>
            <button
              className="w-full mt-4 p-2 bg-blue-600 text-white rounded"
              onClick={handleSearch}
            >
              ค้นหารถเช่า
            </button>
          </div>

          {/* Booking Check Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mt-6">
            <h3 className="text-lg font-semibold mb-2">ตรวจสอบการจองของคุณ</h3>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="กรอกหมายเลขการจอง"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                className="p-2 border rounded bg-gray-100 w-full"
              />
              <input
                type="text"
                placeholder="กรอกชื่อ-นามสกุล"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="p-2 border rounded bg-gray-100 w-full"
              />
            </div>
            <button className="w-full mt-4 p-2 bg-blue-600 text-white rounded">
              ตรวจสอบ
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-gray-600">
        <p>ติดต่อเรา: @arisa180648 | 📞 0626026020</p>
      </div>
    </div>
  );
}

export default HomePage;