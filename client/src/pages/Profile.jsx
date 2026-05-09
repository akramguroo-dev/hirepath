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
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const calculateCompleteness = () =>{
    if(!userData) return 0;
    let count =0;
    if(userData.name) count++;
    if(userData.location) count++;
    if(userData.college) count++;
    if(userData.skills && userData.skills.length > 0) count++;
    if(userData.education && userData.education[0]?.degree) count++;

    return count * 20;
  };
  const completeness = calculateCompleteness();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA]">
        <div className="w-10 h-10 border-4 border-[#008BDC] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Loading Profile...</p>
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
    <div className="min-h-screen bg-[#F8F9FA] py-6 md:py-10 px-4 md:px-12 font-sans text-[#444444]">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8 flex flex-col lg:flex-row justify-between items-center lg:items-start mb-8 gap-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 w-full lg:w-auto">
            <div className="w-20 h-20 bg-[#F0F9FF] text-[#00A5EC] rounded-full flex items-center justify-center text-3xl font-bold border border-blue-100">
              {profileData.name.charAt(0)}
            </div>
            <div className="text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {profileData.name}
              </h1>
              <p className="text-gray-500 font-medium">{profileData.email}</p>
              <p className="text-gray-400 text-sm mt-1 flex items-center justify-center sm:justify-start gap-1">
                📍 {profileData.location}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-end gap-6 w-full lg:w-auto">
            <div className="w-full max-w-xs md:w-80">
              <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                <span>Profile Completeness</span>
                <span className="text-[#00A5EC]">{completeness}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#3b82f6] h-full transition-all duration-500" style={{width:`${completeness}%`}}></div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-2 w-full">
              <button
                onClick={() => navigate("/my-applications")}
                className=" flex-1 sm:flex-none text-xs font-semibold text-[#008BDC] border border-[#008BDC] px-3 md:px-4  py-2 rounded-md hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                My Applications
              </button>
              <button
                onClick={() => navigate("/my-feedback")}
                className=" flex-1 sm:flex-none text-xs sm:text-sm font-semibold text-[#008BDC] border border-[#008BDC] px-3 md:px-4 py-2 rounded-md hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                My Feedback
              </button>
              <button
                onClick={() => navigate("/student-dashboard")}
                className="w-full sm:w-auto text-xs font-semibold text-[#008BDC] border border-[#008BDC] px-3 md:px-4 py-2 rounded-md hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                My Dashboard
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto md:overflow-hidden">
              <nav className="flex flex-row md:flex-col min-w-max md:min-w-0">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`flex items-center gap-3 text-left px-5 md:px-6 py-4 md:py-5 text-sm font-semibold border-b border-gray-50 transition-all whitespace-nowrap ${
                      activeTab === item.name
                        ? "text-[#00A5EC] bg-[#F0F9FF] border-b-2 md:border-b-0 md:border-r-4 border-[#00A5EC]"
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
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-10 shadow-sm text-left relative min-h-[400px] md:min-h-[500px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl  md:text-2xl font-bold text-gray-800">
                  {activeTab}
                </h2>
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="flex items-center gap-1 text-[#00A5EC] border border-[#00A5EC] px-3 py-1.5 rounded-md font-bold text-xs md:text-sm hover:bg-blue-50 transition-colors"
                >
                  <Edit3 size={14} /> Edit
                </button>
              </div>
              <hr className="border-gray-100 mb-8 md:mb-10" />
              {activeTab === "Education" && (
                <div className="border-l-4 border-[#00A5EC] pl-4 md:pl-6 py-2 mb-16">
                  <h4 className="font-bold text-lg md:text-xl text-gray-800">
                    {profileData.education.degree}
                  </h4>
                  <p className="text-[#00A5EC] font-bold mt-1 text-base md:text-lg">
                    {profileData.education.school}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {profileData.education.year}
                  </p>
                </div>
              )}
              {activeTab === "Personal Details" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className=" text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                      Full Name
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {profileData.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                      Email
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {profileData.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                      College
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {profileData.college}
                    </p>
                  </div>
                  <div>
                    <p className=" text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                      Location
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {profileData.location}
                    </p>
                  </div>
                </div>
              )}
              {activeTab === "Skills" && (
                <div className="flex flex-wrap gap-2">
                  {userData?.skills?.length > 0 ? (
                    userData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-[#008BDC] border border-blue-100 rounded-full text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No skills added yet.</p>
                  )}
                </div>
              )}
              {activeTab === "Internships" && (
                <p className="text-gray-400 text-sm">No internships added yet.</p>
              )}
              {activeTab === "Jobs" && (
                <p className="text-gray-400 text-sm">No jobs added yet.</p>
              )}
              {activeTab === "Projects" && (
                <p className="text-gray-400 text-sm">No projects added yet.</p>
              )}
              {activeTab === "Accomplishments" && (
                <p className="text-gray-400 text-sm">No accomplishments added yet.</p>
              )}
              <div className=" mt-12 md:mt-20">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-6 tracking-wide">
                  Resume
                </h3>
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 md:p-12 text-center bg-white">
                  <p className="text-gray-500 mb-6 text-sm font-medium">
                    Upload your resume (PDF/DOC, max 2MB)
                  </p>
                  <button className=" w-full sm:w-auto bg-[#3b82f6] text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-blue-100">
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
