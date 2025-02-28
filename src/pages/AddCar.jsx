import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddCar() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [picture, setPicture] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !brand || !model) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง!");
      return;
    }

    try {
      await axios.post("https://project-server-zvjt.onrender.com/api/cars", {
        name,
        brand,
        model,
        picture,
      });

      alert("เพิ่มรถสำเร็จ!");
      navigate("/");
    } catch (error) {
      console.error("Error adding car:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มรถ");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">เพิ่มรถใหม่</h2>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-600">ชื่อรถ</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">ยี่ห้อ</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">รุ่น</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">ลิงก์รูปภาพ (ไม่บังคับ)</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            เพิ่มรถ
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCar;
