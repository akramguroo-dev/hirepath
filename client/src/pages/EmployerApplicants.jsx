import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function EmployerApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [jobTitle, setJobTitle] = useState("");
  const [viewingApplicant, setViewingApplicant] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get(`/applications/job/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplicants(response.data.jobApps);
        const title = await API.get(`/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobTitle(title.data.job.title);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplicants();
  }, [id]);

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
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setApplicants(
        applicants.map((a) => (a._id === appId ? { ...a, status } : a)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleMessage = async (studentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.post(
        "/chat/conversations",
        { otherUserId: studentId, jobId: id },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      navigate("/messages", { state: { conversationId: response.data._id } });
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#008BDC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/employer-dashboard"
          aria-label="Return to the main employer dashboard panel"
          className="text-blue-600 hover:underline flex items-center mb-6 font-medium"
        >
          <span className="mr-2">←</span> Back to Employer Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Applicants for <span className="text-blue-600">{jobTitle}</span>
        </h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
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
              {applicants.length > 0 ? (
                applicants.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 align-middle whitespace-nowrap">
                      <button
                        onClick={() => setViewingApplicant(app.student_id)}
                        aria-label={`View full profile for ${app.student_id.name}`}
                        className="text-[#008BDC] hover:underline font-semibold"
                      >
                        {app.student_id.name}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-gray-600 align-middle">
                      {app.student_id.email}
                    </td>
                    <td className="px-6 py-4 text-gray-600 align-middle">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(app.status)}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2 items-center flex-wrap">
                      <button
                        onClick={() => setViewingApplicant(app.student_id)}
                        aria-label={`View profile for ${app.student_id.name}`}
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs font-bold rounded"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => handleMessage(app.student_id._id)}
                        aria-label={`Message ${app.student_id.name}`}
                        className="px-3 py-1 bg-[#00A5EC] hover:bg-[#0095D8] text-white text-xs font-bold rounded"
                      >
                        Message
                      </button>
                      {app.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleStatus(app._id, "accepted")}
                            aria-label={`Accept candidate application from ${app.student_id.name}`}
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatus(app._id, "rejected")}
                            aria-label={`Reject candidate application from ${app.student_id.name}`}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {app.status === "accepted" && (
                        <button
                          onClick={() => handleStatus(app._id, "rejected")}
                          aria-label={`Reject candidate application from ${app.student_id.name}`}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded"
                        >
                          Reject
                        </button>
                      )}
                      {app.status === "rejected" && (
                        <button
                          onClick={() => handleStatus(app._id, "accepted")}
                          aria-label={`Accept candidate application from ${app.student_id.name}`}
                          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded"
                        >
                          Accept
                        </button>
                      )}
                      {app.status === "accepted" && !app.employer_feedback && (
                        <Link
                          to={`/feedback/${app._id}`}
                          aria-label={`Write performance feedback for ${app.student_id.name}`}
                          className="px-3 py-1 bg-[#008BDC] hover:bg-[#0076bb] text-white text-xs font-bold rounded"
                        >
                          Feedback
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <div className="p-12 text-center text-gray-400">
                      No applicants yet for this job.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-400">
              Showing {applicants.length} candidates
            </p>
          </div>
        </div>
      </div>

      {/* Applicant Profile Modal */}
      {viewingApplicant && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setViewingApplicant(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                  {viewingApplicant.profilePhoto ? (
                    <img
                      src={viewingApplicant.profilePhoto}
                      alt={viewingApplicant.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-bold">
                      NO PHOTO
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {viewingApplicant.name}
                  </h2>
                  <p className="text-sm text-gray-500">{viewingApplicant.email}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingApplicant(null)}
                aria-label="Close applicant profile"
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-5">
              {viewingApplicant.college && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    College
                  </h3>
                  <p className="text-sm text-gray-800">{viewingApplicant.college}</p>
                </div>
              )}

              {viewingApplicant.skills?.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {viewingApplicant.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-[#008BDC] text-xs font-semibold rounded-full border border-blue-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {viewingApplicant.education?.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Education
                  </h3>
                  <div className="space-y-2">
                    {viewingApplicant.education.map((edu, idx) => (
                      <div key={idx} className="text-sm text-gray-800">
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-gray-500">
                          {edu.school} {edu.year && `· ${edu.year}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!viewingApplicant.college &&
                !viewingApplicant.skills?.length &&
                !viewingApplicant.education?.length && (
                  <p className="text-sm text-gray-400 text-center py-4">
                    This candidate hasn't completed their profile yet.
                  </p>
                )}

              {viewingApplicant.resume && (
                <a
                  href={viewingApplicant.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Download resume for ${viewingApplicant.name}`}
                  className="block w-full text-center px-4 py-2 bg-[#008BDC] hover:bg-[#0076bb] text-white text-sm font-semibold rounded"
                >
                  Download Resume
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}