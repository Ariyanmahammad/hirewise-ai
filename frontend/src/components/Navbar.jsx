import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, user, logout } = useContext(AuthContext);
  return (
    <nav className="w-full bg-white shadow-sm px-8 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        <span className="text-3xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          HireWise AI
        </span>
      </Link>

      <div className="flex items-center gap-6 text-gray-700 font-medium">
        <Link to="/">Home</Link>

        <Link to="/jobs">Jobs</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>

            <Link
              to="/register"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {user?.role === "company" || user?.role === "admin" ? (
              <Link to="/admin">Dashboard</Link>
            ) : (
              <Link to="/my-applications">My Applications</Link>
            )}

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
