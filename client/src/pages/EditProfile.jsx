import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import toast from "react-hot-toast";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    college: "",
    degree: "",
    year: "",
    skills: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const { name, location, college, skills } = res.data.user;
      setFormData({
        name: name || "",
        location: location || "",
        college: college || "",
        degree: res.data.user.education?.[0]?.degree || "",
        year: res.data.user.education?.[0]?.year || "",
        skills: skills ? skills.join(", ") : "",
      });
    });
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.put(
        "/auth/profile",
        {
          ...formData,
          education: [
            {
              degree: formData.degree,
              school: formData.college,
              year: formData.year,
            },
          ],
          skills: formData.skills.split(",").map((s) => s.trim()),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Profile saved successfully!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
          Edit Profile
        </h1>
        <div className="bg-white rounded-xl shadow-md overflow-hidden border-t-8 border-[#008BDC] p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="e.g. Akram Guroo"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                type="text"
                placeholder="e.g. Srinagar, J&K"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                College
              </label>
              <input
                name="college"
                value={formData.college}
                onChange={handleChange}
                type="text"
                placeholder="e.g. NIT Srinagar"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Degree
              </label>
              <input
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                type="text"
                placeholder="e.g. BTech in CSE"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Year
              </label>
              <input
                name="year"
                value={formData.year}
                onChange={handleChange}
                type="text"
                placeholder="e.g. 2026"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Skills (comma separated)
              </label>
              <input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                type="text"
                placeholder="e.g. React, Node.js, MongoDB"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#008BDC] hover:bg-[#0076bb] text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
