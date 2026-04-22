import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  GraduationCap,
  Briefcase,
  FileText,
  Code,
  Trophy,
  Layout,
  Edit3,
} from "lucide-react";
import API from "../api/axios";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Education");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const menuItems = [
    { name: "Personal Details", icon: <User size={18} /> },
    { name: "Education", icon: <GraduationCap size={18} /> },
    { name: "Internships", icon: <Briefcase size={18} /> },
    { name: "Jobs", icon: <Briefcase size={18} /> },
    { name: "Projects", icon: <Layout size={18} /> },
    { name: "Skills", icon: <Code size={18} /> },
    { name: "Accomplishments", icon: <Trophy size={18} /> },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    API.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setUserData(response.data.user);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        Loading Profile...
      </div>
    );
  }

  const profileData = {
    name: userData?.name || "Unknown User",
    email: userData?.email || "",
    role: userData?.role || "Student",
    college: userData?.college || "College not added",
    location: userData?.location || "Location not added",
    education: userData?.education?.[0] || {
      degree: "Degree not added",
      school: "",
      year: "",
    },
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-10 px-4 md:px-12 font-sans text-[#444444]">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-[#F0F9FF] text-[#00A5EC] rounded-full flex items-center justify-center text-3xl font-bold border border-blue-100">
              {profileData.name.charAt(0)}
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-800">
                {profileData.name}
              </h1>
              <p className="text-gray-500 font-medium">{profileData.email}</p>
              <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
                📍 {profileData.location}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4 mt-6 md:mt-0">
            <div className="w-full md:w-80">
              <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                <span>Profile Completeness</span>
                <span className="text-[#00A5EC]">30%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#3b82f6] h-full w-[30%]"></div>
              </div>
            </div>
            <button
              onClick={() => navigate("/my-applications")}
              className="text-sm font-semibold text-[#008BDC] border border-[#008BDC] px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
            >
              My Applications
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <nav className="flex flex-col">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`flex items-center gap-3 text-left px-6 py-5 text-sm font-semibold border-b border-gray-50 transition-all ${
                      activeTab === item.name
                        ? "text-[#00A5EC] bg-[#F0F9FF] border-r-4 border-[#00A5EC]"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={
                        activeTab === item.name
                          ? "text-[#00A5EC]"
                          : "text-gray-400"
                      }
                    >
                      {item.icon}
                    </span>
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
          <main className="w-full md:w-3/4">
            <div className="bg-white border border-gray-200 rounded-xl p-10 shadow-sm text-left relative min-h-[500px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {activeTab}
                </h2>
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="flex items-center gap-1 text-[#00A5EC] border border-[#00A5EC] px-4 py-1.5 rounded-md font-bold text-sm hover:bg-blue-50 transition-colors"
                >
                  <Edit3 size={14} /> Edit
                </button>
              </div>
              <hr className="border-gray-100 mb-10" />
              {activeTab === "Education" && (
                <div className="border-l-4 border-[#00A5EC] pl-6 py-2 mb-16">
                  <h4 className="font-bold text-xl text-gray-800">
                    {profileData.education.degree}
                  </h4>
                  <p className="text-[#00A5EC] font-bold mt-1 text-lg">
                    {profileData.education.school}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {profileData.education.year}
                  </p>
                </div>
              )}
              <div className="mt-20">
                <h3 className="text-sm font-bold text-gray-500 uppercase mb-6 tracking-wide">
                  Resume
                </h3>
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-12 text-center bg-white">
                  <p className="text-gray-500 mb-6 font-medium">
                    Upload your resume (PDF/DOC, max 2MB)
                  </p>
                  <button className="bg-[#3b82f6] text-white px-10 py-3 rounded-lg font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-blue-100">
                    Upload Resume
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}