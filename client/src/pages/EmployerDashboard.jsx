import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import API from "../api/axios";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [employerName, setEmployerName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("open");

  const navigate = useNavigate();

  useEffect(() => {
    const employerDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch employer's jobs
        const resOne = await API.get("/jobs/employer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(resOne.data.jobs);

        // Fetch employer's applications
        const resApps = await API.get("/applications/employer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(resApps.data.applications || []);

        // Fetch employer name
        const resTwo = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployerName(resTwo.data.user.name);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    employerDetails();
  }, [navigate]);

  // Filter jobs by status
  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "open") return job.status === "open";
    if (activeTab === "closed") return job.status === "closed";
    return true;
  });

  // Filter pending applications
  const pendingApplications = applications.filter((app) => app.status === "pending");

  const openCount = jobs.filter((j) => j.status === "open").length;
  const closedCount = jobs.filter((j) => j.status === "closed").length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#008BDC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-10 font-sans text-[#484848]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#212121]">
              Welcome, {employerName} 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Here is what's happening with your job postings today.
            </p>
          </div>
          <button
            onClick={() => navigate("/post-job")}
            className="flex items-center justify-center gap-2 bg-[#008BDC] hover:bg-[#0077ba] text-white px-6 py-3 rounded font-semibold transition-all shadow-sm active:scale-95 text-sm md:text-base"
          >
            <Plus size={18} strokeWidth={3} />
            Post a New Job
          </button>
        </div>

        {/* Pending Applications Alert */}
        {pendingApplications.length > 0 && (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900">
                {pendingApplications.length} Pending Application{pendingApplications.length !== 1 ? 's' : ''} Awaiting Review
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Review and respond to applicants to improve your hiring experience.
              </p>
            </div>
          </div>
        )}

        {/* Job Status Tabs */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto whitespace-nowrap">
          <button 
            onClick={() => setActiveTab("open")}
            className={`px-6 py-3 border-b-2 font-bold text-sm transition-all ${
              activeTab === "open"
                ? "border-[#008BDC] text-[#008BDC]"
                : "border-transparent text-gray-500 hover:text-[#008BDC]"
            }`}
            aria-label={`View active job postings - ${openCount} jobs`}
          >
            Active Postings ({openCount})
          </button>
          <button 
            onClick={() => setActiveTab("closed")}
            className={`px-6 py-3 border-b-2 font-bold text-sm transition-all ${
              activeTab === "closed"
                ? "border-[#008BDC] text-[#008BDC]"
                : "border-transparent text-gray-500 hover:text-[#008BDC]"
            }`}
            aria-label={`View closed job postings - ${closedCount} jobs`}
          >
            Closed Postings ({closedCount})
          </button>
        </div>

        {/* Posted Jobs Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-8">
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
            {filteredJobs.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                <p>No jobs in this category yet!</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job._id}
                  onClick={() =>
                    navigate(`/employer/jobs/${job._id}/applicants`)
                  }
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
            <button 
              onClick={() => setActiveTab("open")}
              aria-label="View all job postings"
              className="text-[#008BDC] font-semibold text-sm hover:underline"
            >
              View all postings
            </button>
          </div>
        </div>

        {/* Pending Applications Section */}
        {pendingApplications.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-2">
              <AlertCircle size={20} className="text-yellow-600" />
              <h2 className="text-lg font-bold text-[#212121]">
                Pending Applications ({pendingApplications.length})
              </h2>
            </div>

            <div className="divide-y divide-gray-100">
              {pendingApplications.map((app) => (
                <div
                  key={app._id}
                  onClick={() =>
                    navigate(`/employer/jobs/${app.job_id._id}/applicants`)
                  }
                  className="p-6 hover:bg-blue-50/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-[#212121] group-hover:text-[#008BDC] transition-colors">
                      {app.student_id?.name || "Unknown Applicant"}
                    </h3>
                    <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={16} className="text-gray-400" />
                        {app.job_id?.title || "Job Title"}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs bg-gray-100 px-2 py-1 rounded">
                        <Clock size={14} />{" "}
                        {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-yellow-50 text-yellow-600 border border-yellow-100">
                      {app.status}
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-gray-300 group-hover:text-[#008BDC] transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}