import { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import API from "../api/axios";

export default function Jobs() {
  const [jobsList, setJobsList] = useState([]);

  useEffect(() => {
    API.get("/jobs")
      .then((response) => setJobsList(response.data.jobs))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 border-l-4 border-[#00A5EC] pl-4">
            Available Jobs
          </h1>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobsList.map((job) => (
            <JobCard
              key={job._id}
              id={job._id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
              duration={job.duration}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
