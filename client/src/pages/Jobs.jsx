import { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import API from "../api/axios";
import { motion } from "framer-motion";

export default function Jobs() {
  const [jobsList, setJobsList] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    location: "",
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const response = await API.get("/jobs", {
          params: {
            search: filters.search,
            type: filters.type,
            location: filters.location,
            page,
            limit: 9,
          },
        });

        setJobsList(response.data.jobs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#008BDC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 border-l-4 border-[#00A5EC] pl-4">
            Available Jobs
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by title or company..."
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
            className="w-full md:flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none shadow-sm"
          />

          <select
            value={filters.type}
            onChange={(e) =>
              setFilters({ ...filters, type: e.target.value })
            }
            className="w-full md:w-48 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none bg-white shadow-sm"
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
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
            className="w-full md:w-64 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none shadow-sm"
          />
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobsList.length === 0 ? (
            <div className="text-gray-500 col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-lg font-medium">
                No jobs found matching your criteria.
              </p>
            </div>
          ) : (
            jobsList.map((job) => (
              <motion.div
              key={job._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              >
              <JobCard
                key={job._id}
                id={job._id}
                title={job.title}
                company={job.company}
                location={job.location}
                salary={job.salary}
                duration={job.duration}
              />
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-[#008BDC] text-white rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2 font-semibold text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-[#008BDC] text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}