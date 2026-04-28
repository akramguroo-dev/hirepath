import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import toast from "react-hot-toast";

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    company: "",
    location: "",
    salary: "",
    duration: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      await API.post("/jobs", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Job posted successfully!");
      navigate("/employer-dashboard");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
          Post a New Job
        </h1>
        <div className="bg-white rounded-xl shadow-md overflow-hidden border-t-8 border-[#008BDC] p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text"
                placeholder="e.g. Senior React Developer"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name
              </label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                type="text"
                placeholder="e.g. HirePath Tech"
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
                placeholder="e.g. Remote / Srinagar, J&K"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
              >
                <option value="internship">internship</option>
                <option value="full-time">full-time</option>
                <option value="part-time">part-time</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stipend/Salary
                </label>
                <input
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. ₹25,000/month"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. 6 Months"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Describe the job responsibilities and requirements..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
              ></textarea>
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#008BDC] hover:bg-[#0076bb] text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform active:scale-95"
              >
                Submit Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
