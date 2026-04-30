import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function StudentDashboard() {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const userRes = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(userRes.data.user.name);
        const appsRes = await API.get("/applications/student", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(appsRes.data.myApplications);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getUserDetails();
  }, []);

  const validApplications = applications.filter(a => a.job_id !== null);
  const totalAppSent = applications.length;
  const recentApplications = validApplications.slice(0, 3);
  const acceptedApps = applications.filter(a => a.status === "accepted").length;
  const rejectedApps = applications.filter(a => a.status === "rejected").length;

  const stats = [
    { label: "Applications Sent", count: totalAppSent, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Accepted", count: acceptedApps, color: "text-green-600", bg: "bg-green-50" },
    { label: "Rejected", count: rejectedApps, color: "text-red-600", bg: "bg-red-50" },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted": return "bg-green-100 text-green-700 border-green-200";
      case "rejected": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-5">
          <div>
            <h1 className="text-3xl font-bold text-[#212121]">
              Welcome back, <span className="text-[#008BDC]">{userName}</span>! 👋
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Monitor your progress and manage your applications.
            </p>
          </div>
          <Link
            to="/jobs"
            className="px-8 py-3 bg-[#008BDC] text-white rounded font-bold hover:bg-[#0076ba] transition shadow-md flex items-center justify-center"
          >
            Browse Jobs
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bg} p-10 rounded-lg border border-gray-100 shadow-sm transition hover:shadow-md`}>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <p className={`text-5xl font-extrabold ${stat.color} mt-3`}>{stat.count}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-bold text-[#212121]">Recent Applications</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Job Title</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Company</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Applied Date</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentApplications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#008BDC]">{app.job_id.title}</td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{app.job_id.company}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}