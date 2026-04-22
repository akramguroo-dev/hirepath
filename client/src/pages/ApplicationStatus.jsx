import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function ApplicationStatus() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    API.get("/applications/student", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setApplications(response.data.myApplications);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading applications...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#212121]">My Applications</h1>
          <p className="text-gray-500 mt-1">
            Track the progress of your job and internship applications.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.filter(app => app.job_id !== null).map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-[#008BDC]">
                    {app.job_id.title}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {app.job_id.company}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(app.status)}`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {applications.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              No applications found. Go find your dream internship!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}