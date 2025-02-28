import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CarRental from "./pages/CarRental";

import CarDetails from "./pages/CarDetails";

import HomePage from "./pages/HomePage";
import AddCar from "./pages/AddCar";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/car-rental" element={<CarRental/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/add-car" element={<AddCar />} />
      </Routes>
    </Router>
  );
}

export default App;
