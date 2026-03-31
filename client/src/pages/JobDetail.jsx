import { useNavigate, useParams } from "react-router-dom";
export default function JobDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const job = {
    title: "Frontend Developer Intern",
    company: "HirePath Tech",
    location: "Srinagar / Remote",
    startDate: "Immediately",
    salary: "₹15,000 - ₹20,000 /month",
    duration: "6 Months",
    applyBy: "15 Apr '26",
    postedDaysAgo: "2 days ago",
    applicants: "124 Applicants",
    description: "We are looking for a motivated Frontend Intern with a strong grasp of React.js and Tailwind CSS. You will work on building reusable components and integrating APIs for the HirePath platform. Knowledge of Responsive Design is a must.",
    skills: ["React.js", "JavaScript", "Tailwind CSS", "Git", "REST APIs"],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center text-[#00A5EC] font-bold mb-6 hover:underline transition-all"
        >
          <span className="mr-2">←</span> Back to all jobs
        </button>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="border-b border-gray-100 pb-6 mb-8 text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-[#00A5EC] font-semibold mt-2 text-lg">{job.company}</p>
            <p className="text-gray-500 mt-1 flex items-center gap-1">📍 {job.location}</p>
            <span className="inline-block bg-blue-50 text-[#00A5EC] text-[10px] font-black px-2 py-1 rounded mt-4 uppercase tracking-wider border border-blue-100">
              {job.postedDaysAgo}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 mb-10 text-left">
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Start Date</p>
              <p className="text-gray-800 font-semibold mt-1">{job.startDate}</p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Salary</p>
              <p className="text-gray-800 font-semibold mt-1">{job.salary}</p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Duration</p>
              <p className="text-gray-800 font-semibold mt-1">{job.duration}</p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Apply By</p>
              <p className="text-gray-800 font-semibold mt-1">{job.applyBy}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-10 text-sm text-gray-600 font-medium">
             <span className="bg-gray-100 px-3 py-1 rounded-full text-[11px]">👥 {job.applicants}</span>
          </div>
          <div className="mb-10 text-left">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-[#00A5EC] w-fit">About the job</h3>
            <p className="text-gray-600 leading-relaxed text-[15px]">
              {job.description}
            </p>
          </div>
          <div className="mb-12 text-left">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Skills required</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span key={index} className="bg-gray-50 text-gray-700 border border-gray-200 px-4 py-1.5 rounded-lg text-sm font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-center sm:justify-start border-t border-gray-100 pt-8">
            <button className="bg-[#00A5EC] text-white px-12 py-4 rounded-xl font-black hover:bg-[#0084c0] transition-all shadow-xl shadow-blue-100 uppercase tracking-wide">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}