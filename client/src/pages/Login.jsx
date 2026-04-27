import { Link } from "react-router-dom";
import API from "../api/axios";
import { useState } from "react";

import toast from "react-hot-toast";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      window.location.href = "/";
    } catch (error) {
      console.log(error.response.data);

      toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded px-6 pt-12 pb-6 w-96 max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="flex gap-8 mb-6">
          <div className="text-[#00A5EC] border-b-2 border-[#00A5EC] pb-1 inline-block">
            Student
          </div>
          <div className="text-gray-500 pb-1 cursor-not-allowed">Employer</div>
        </div>
        <div className="flex justify-center mb-4">
          <p className="text-gray-500 text-sm">OR</p>
        </div>
        <label htmlFor="" className="block mb-4">
          Email
          <input
            className="border rounded w-full px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
          />
        </label>
        <label htmlFor="" className="block mb-3">
          Password
          <input
            className="border rounded w-full px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Must be atleast 6 characters"
          />
        </label>
        <Link to="" className="text-[#00A5EC] flex justify-end mb-3">
          Forgot password?
        </Link>
        <button
          type="submit"
          className="w-full border rounded bg-[#00A5EC] text-white font-semibold py-2 mb-4 hover:bg-blue-600"
        >
          Login
        </button>
        <p className="w-full">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#00A5EC] hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
