import { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import API from "../api/axios";

export default function Jobs() {
  const [jobsList, setJobsList] = useState([]);
  const [filters, setFilters] = useState({ search: "", type: "", location: "" });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await API.get("/jobs", {
          params: {
            search: filters.search,
            type: filters.type,
            location: filters.location,
          },
        });
        setJobsList(response.data.jobs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 border-l-4 border-[#00A5EC] pl-4">
            Available Jobs
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by title or company..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none"
          />
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none"
          >
            <option value="">All Types</option>
            <option value="internship">Internship</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
          </select>
          <input
            type="text"
            placeholder="Filter by location..."
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobsList.length === 0 ? (
            <p className="text-gray-500 col-span-3 text-center py-10">
              No jobs found.
            </p>
          ) : (
            jobsList.map((job) => (
              <JobCard
                key={job._id}
                id={job._id}
                title={job.title}
                company={job.company}
                location={job.location}
                salary={job.salary}
                duration={job.duration}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}