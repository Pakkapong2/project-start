import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between">
      <h1 className="text-white text-lg font-bold">My App</h1>
      <Link to="/login" className="bg-white text-blue-600 px-4 py-1 rounded">
        Login
      </Link>
    </nav>
  );
}

export default Navbar;
