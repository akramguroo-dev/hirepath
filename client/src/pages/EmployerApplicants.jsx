import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function EmployerApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.get(`/applications/job/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setApplicants(response.data.jobApps);
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

  const handleStatus = async (appId, status) => {
    try {
      const token = localStorage.getItem("token");
      await API.patch(
        `/applications/${appId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplicants(applicants.map((a) =>
        a._id === appId ? { ...a, status } : a
      ));
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading applicants...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/employer-dashboard"
          className="text-blue-600 hover:underline flex items-center mb-6 font-medium"
        >
          <span className="mr-2">←</span> Back to Employer Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Applicants for{" "}
          <span className="text-blue-600">Frontend Developer</span>
        </h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Applicant Name
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applicants.map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {app.student_id.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {app.student_id.email}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(app.status)}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleStatus(app._id, "accepted")}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatus(app._id, "rejected")}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-400">
              Showing {applicants.length} candidates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}