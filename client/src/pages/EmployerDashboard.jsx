import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  ChevronRight,
} from "lucide-react";
import API from "../api/axios";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    API.get("/jobs/employer", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setJobs(response.data.jobs);
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
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-10 font-sans text-[#484848]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#212121]">
              Welcome, Company HR 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Here is what's happening with your job postings today.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-[#008BDC] hover:bg-[#0077ba] text-white px-6 py-3 rounded font-semibold transition-all shadow-sm active:scale-95 text-sm md:text-base">
            <Plus size={18} strokeWidth={3} />
            Post a New Job
          </button>
        </div>

        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto whitespace-nowrap">
          <button className="px-6 py-3 border-b-2 border-[#008BDC] text-[#008BDC] font-bold text-sm">
            Active Postings ({jobs.filter((j) => j.status === "open").length})
          </button>
          <button className="px-6 py-3 text-gray-500 font-medium text-sm hover:text-[#008BDC] transition">
            Pending Approval
          </button>
          <button className="px-6 py-3 text-gray-500 font-medium text-sm hover:text-[#008BDC] transition">
            Closed Postings
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase size={20} className="text-[#008BDC]" />
              <h2 className="text-lg font-bold text-[#212121]">
                My Posted Jobs
              </h2>
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Live Status
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {jobs.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                <p>You haven't posted any jobs yet!</p>
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="p-6 hover:bg-blue-50/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-[#212121] group-hover:text-[#008BDC] transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Users size={16} className="text-gray-400" />
                        <span className="font-semibold text-gray-700">
                          {job.applicants || 0}
                        </span>{" "}
                        Applicants
                      </span>
                      <span className="flex items-center gap-1.5 text-xs bg-gray-100 px-2 py-1 rounded capitalize">
                        <Clock size={14} />{" "}
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        job.status === "open"
                          ? "bg-green-50 text-green-600 border border-green-100"
                          : "bg-red-50 text-red-600 border border-red-100"
                      }`}
                    >
                      {job.status === "open" && <CheckCircle2 size={12} />}
                      {job.status}
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-gray-300 group-hover:text-[#008BDC] transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
            <button className="text-[#008BDC] font-semibold text-sm hover:underline">
              View all postings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
