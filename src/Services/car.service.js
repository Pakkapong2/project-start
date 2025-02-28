import axios from "../http-common"; // ใช้ baseURL จาก http-common.js

const getAllCars = () => {
  return axios.get("/cars"); // ✅ เรียก API รถทั้งหมด
};

const getCarById = (id) => {
  return axios.get(`/cars/${id}`); // ✅ ดึงข้อมูลรถตาม ID
};

const addCar = (data) => {
  return axios.post("/cars", data);
};

// ✅ อัปเดตรถ (PUT ใช้แทนที่ข้อมูลทั้งหมด)
const updateCar = (id, data) => {
  return axios.put(`/cars/${id}`, data);
};

// ✅ อัปเดตรถบางส่วน (PATCH ใช้แก้ไขบางฟิลด์)
const patchCar = (id, data) => {
  return axios.patch(`/cars/${id}`, data);
};

// ✅ ลบรถ
const deleteCar = (id) => {
  return axios.delete(`/cars/${id}`);
};

export default { getAllCars, getCarById, addCar, updateCar, patchCar, deleteCar };
