import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    type: "internship",
    company: "",
    location: "",
    salary: "",
    duration: "",
    description: "",
    companyLogo: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await API.post("/upload/logo", uploadFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData((prev) => ({ ...prev, companyLogo: res.data.url }));
      toast.success("Logo uploaded!");
    } catch (err) {
      toast.error("Logo upload failed");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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
      toast.error("Failed to post job. Please try again.");
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
            {/* Company Logo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
              />
              {formData.companyLogo && (
                <div className="mt-3">
                  <img
                    src={formData.companyLogo}
                    alt="Company Logo"
                    className="w-20 h-20 object-cover rounded-lg border-2 border-[#008BDC]"
                  />
                </div>
              )}
            </div>

            {/* Job Title */}
            <div>
              <label htmlFor="job-title" className="block text-sm font-semibold text-gray-700 mb-2">
                Job Title
              </label>
              <input
              id="job-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text"
                placeholder="e.g. Senior React Developer"
                aria-label="Enter the official title for the job position"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="company-name" className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name
              </label>
              <input
              id="company-name"
                name="company"
                value={formData.company}
                onChange={handleChange}
                type="text"
                placeholder="e.g. HirePath Tech"
                aria-label="Enter your company or organization name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="job-location" className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
              id="job-location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                type="text"
                placeholder="e.g. Remote / Srinagar, J&K"
                aria-label="Enter job location such as city, region or Remote"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Type */}
            <div>
              <label htmlFor="job-type" className="block text-sm font-semibold text-gray-700 mb-2">
                Type
              </label>
              <select
              id="job-type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                aria-label="Select the employment type format"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
              >
                <option value="internship">internship</option>
                <option value="full-time">full-time</option>
                <option value="part-time">part-time</option>
              </select>
            </div>

            {/* Salary & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="job-salary" className="block text-sm font-semibold text-gray-700 mb-2">
                  Stipend/Salary
                </label>
                <input
                id="job-salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. ₹25,000/month"
                  aria-label="Enter compensation package or stipend details"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="job-duration" className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration
                </label>
                <input
                id="job-duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. 6 Months"
                  aria-label="Enter employment or contract tenure duration"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label htmlFor="job-description" className="block text-sm font-semibold text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
              id="job-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Describe the job responsibilities and requirements..."
                aria-label="Write a thorough summary of job descriptions and criteria"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                aria-label="Submit form to publish this new job listing"
                className="w-full bg-[#008BDC] hover:bg-[#0076bb] text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform active:scale-95"
                disabled={isLoading}
                className="w-full bg-[#008BDC] hover:bg-[#0076bb] disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform active:scale-95"
              >
                {isLoading ? "Uploading..." : "Submit Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
