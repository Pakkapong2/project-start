import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import fallbackImage from "../images/1.png"; // ใส่รูป fallback เอง

function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    axios
      .get(`https://project-server-zvjt.onrender.com/api/cars/${id}`)
      .then((response) => {
        if (response.data) {
          setCar(response.data);
        } else {
          console.error("No car data found.");
        }
      })
      .catch((error) => console.error("Error fetching car details:", error));
  }, [id]);

  if (!car) return <p className="text-center mt-10">กำลังโหลดข้อมูล...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow-lg">
      <img
        src={car.picture ? car.picture : fallbackImage}
        alt={car.name || "ไม่ทราบชื่อรถ"}
        className="w-full h-64 object-cover rounded"
        onError={(e) => (e.target.src = fallbackImage)} // กรณีรูปเสีย
      />
      <h2 className="text-2xl font-bold mt-4">{car.name || "ไม่ทราบชื่อรถ"}</h2>
      <p className="text-gray-600">ยี่ห้อ: {car.brand || "N/A"}</p>
      <p className="text-gray-600">รุ่น: {car.model || "N/A"}</p>
      <p className="text-gray-600">ทะเบียน: {car.license_plate || "N/A"}</p>
      <p className="text-gray-600">ราคาเช่าต่อวัน: {car.price_per_day || "N/A"} บาท</p>

      {/* ปุ่มย้อนกลับและปุ่มเช่ารถ */}
      <div className="mt-6 flex justify-between">
        <button
          className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          onClick={() => navigate(-1)} 
        >
          ย้อนกลับ
        </button>
        <button
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => navigate(`/rent/${id}`)} 
        >
          เช่ารถ
        </button>
      </div>
    </div>
  );
}

export default CarDetail;
