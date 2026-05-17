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
    profilePhoto: "",
    resume: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const { name, location, college, skills, profilePhoto } = res.data.user;
      setFormData({
        name: name || "",
        location: location || "",
        college: college || "",
        degree: res.data.user.education?.[0]?.degree || "",
        year: res.data.user.education?.[0]?.year || "",
        skills: skills ? skills.join(", ") : "",
        profilePhoto: profilePhoto || "",
        resume: res.data.user.resume || "",
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
          name: formData.name,
          location: formData.location,
          college: formData.college,
          profilePhoto: formData.profilePhoto,
          resume: formData.resume,
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

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    try {
      setIsLoading(true);
      const res = await API.post("/upload/profile-photo", uploadFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData((prev) => ({ ...prev, profilePhoto: res.data.url }));
      toast.success("Photo uploaded!");
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    try {
      setIsLoading(true);
      const res = await API.post("/upload/resume", uploadFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData((prev) => ({ ...prev, resume: res.data.url }));
      toast.success("Resume uploaded!");
    } catch (err) {
      toast.error("Resume upload failed");
      console.error(err);
    } finally {
      setIsLoading(false);
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
            {/* Profile Photo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
              />
              {formData.profilePhoto && (
                <div className="mt-3">
                  <img
                    src={formData.profilePhoto}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#008BDC]"
                  />
                </div>
              )}
            </div>

            {/* Full Name */}
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

            {/* Location */}
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

            {/* College */}
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

            {/* Degree */}
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

            {/* Year */}
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

            {/* Skills */}
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

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Resume (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleResumeUpload}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
              />
              {formData.resume && (
                <a
                  href={formData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#008BDC] hover:underline mt-2 inline-block"
                >
                  View Resume
                </a>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#008BDC] hover:bg-[#0076bb] disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform active:scale-95"
              >
                {isLoading ? "Uploading..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
