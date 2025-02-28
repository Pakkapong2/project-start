import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.png";
import { FaUserCircle } from "react-icons/fa";
import carImage1 from "../images/1.png";
import carImage2 from "../images/2.png";
import carImage3 from "../images/3.png";
import carImage4 from "../images/4.png";
import carImage5 from "../images/5.png";
import carImage6 from "../images/6.png";

function CarRental() {
  const [cars, setCars] = useState([]);
  const carImages = [carImage1, carImage2, carImage3, carImage4, carImage5, carImage6];
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    setLoading(true);
    axios
      .get("https://project-server-zvjt.onrender.com/api/cars")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setCars(response.data);
        } else {
          console.error("Invalid API Response:", response.data);
          setCars([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setCars([]);
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = async (carId) => {
    const confirmDelete = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรถคันนี้?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://project-server-zvjt.onrender.com/api/cars/${carId}`);
      setCars(cars.filter((car) => car.id !== carId));
      alert("ลบรถสำเร็จ!");
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("เกิดข้อผิดพลาดในการลบรถ");
    }
  };

  const filteredCars = cars.filter((car) =>
    car.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
          <h1 className="text-white text-lg font-semibold">
            CTB Reserve a Car Online
          </h1>
        </div>

        {/* ปุ่มเพิ่มรถ */}
        <button
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
          onClick={() => navigate("/add-car")}
        >
          + เพิ่มรถ
        </button>

        {/* Login / Profile */}
        <div className="relative">
          {isLoggedIn ? (
            <div>
              <FaUserCircle
                size={30}
                className="text-white cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              />
              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg p-2">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                    ข้อมูลส่วนตัว
                  </Link>
                  <Link to="/change-password" className="block px-4 py-2 hover:bg-gray-200">
                    เปลี่ยนรหัสผ่าน
                  </Link>
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* ค้นหารถ */}
      <div className="text-center mt-6">
        <input
          type="text"
          placeholder="ค้นหารถที่คุณต้องการ"
          className="w-96 p-2 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* แสดง Loading ขณะโหลดข้อมูล */}
      {loading ? (
        <p className="text-center mt-10 text-gray-500">กำลังโหลดข้อมูล...</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-6 justify-center px-10">
          {filteredCars.length > 0 ? (
            filteredCars.map((car, index) => (
              <div key={car.id} className="bg-gray-200 p-6 rounded-lg shadow-lg text-center w-full max-w-xl">
                <img
                  src={car.picture || carImages[index % carImages.length]}
                  alt={car.brand ? `${car.brand} ${car.model}` : "ไม่ทราบชื่อรถ"}
                  className="w-full h-56 object-cover rounded-lg"
                />
                <h3 className="mt-2 text-lg font-semibold">{car.name || "ไม่ทราบชื่อรถ"}</h3>

                <div className="mt-4 flex justify-center gap-4">
                  <button
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-lg"
                    onClick={() => navigate(`/car-details/${car.id}`)}
                  >
                    เลือก
                  </button>
                  <button
                    className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 text-lg"
                    onClick={() => handleDelete(car.id)}
                  >
                    ลบ
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-2 text-center text-gray-500">ไม่พบรถที่ตรงกับการค้นหา</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CarRental;
