import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("candidate");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", {
        ...formData,
        role,
      });

      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-[90vh] bg-slate-50 flex items-center justify-center px-6">
      <form
        onSubmit={handleRegister}
        className="bg-white w-full max-w-md p-8 rounded-3xl shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-slate-500 text-center mb-8">
          Join HireWise AI as a candidate or company
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setRole("candidate")}
            className={`py-3 rounded-xl border font-medium ${
              role === "candidate"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600"
            }`}
          >
            Candidate
          </button>

          <button
            type="button"
            onClick={() => setRole("company")}
            className={`py-3 rounded-xl border font-medium ${
              role === "company"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600"
            }`}
          >
            Company
          </button>
        </div>

        <div className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder={role === "company" ? "Company name" : "Full name"}
            className="w-full border rounded-xl px-4 py-3"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            className="w-full border rounded-xl px-4 py-3"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            type="text"
            placeholder="Phone number"
            className="w-full border rounded-xl px-4 py-3"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-3"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold mt-6 hover:bg-indigo-700"
        >
          Register as {role === "company" ? "Company" : "Candidate"}
        </button>

        <p className="text-center text-slate-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;