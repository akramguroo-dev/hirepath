import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function FeedbackReceived() {
  const [feedbacks, setFeedbacks] = useState([]);
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
        const withFeedback = response.data.myApplications.filter(
          (app) => app.job_id !== null && app.employer_feedback
        );
        setFeedbacks(withFeedback);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [navigate]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#008BDC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#212121]">
            Feedback Received
          </h1>
          <p className="text-gray-500 mt-1">
            Direct feedback and ratings from employers on your applications.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Comment
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {feedbacks.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-[#008BDC] whitespace-nowrap">
                    {item.job_id.title}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium whitespace-nowrap">
                    {item.job_id.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" >
                    <div className="flex text-yellow-500 text-sm font-bold items-center">
                      {item.rating} / 5
                      <span className="ml-1">⭐</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm italic min-w-[300px]">
                    "{item.employer_feedback}"
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {feedbacks.length === 0 && (
            <div className="p-12 text-center text-gray-400 bg-white">
              No feedback received yet. Keep applying!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}