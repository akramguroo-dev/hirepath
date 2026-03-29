import JobCard from "../components/JobCard"
export default function Jobs (){
    const Jobs_List = [
        {
            id :1,
            title: "Frontend Developer Intern",
            company: "HirePath Tech",
            location: "Remote / Srinagar",
            salary: "₹15,000 - ₹20,000 /month",
            duration: "6 Months"
        },
        {
        id: 2,
      title: "Backend Engineer (Node.js)", 
      company: "TechFlow Solutions",
      location: "Hybrid / Srinagar",
      salary: "₹35,000 - ₹45,000 /month",
      duration: "12 Months"
    },
    {
        id: 3,
      title: "UI/UX Designer",
      company: "Creative Agency",
      location: "Remote",
      salary: "₹20,000 - ₹25,000 /month",
      duration: "6 Months"
    },
    {
        id: 4,
      title: "React Native Developer",
      company: "Cascadio Studio",
      location: "Office / Srinagar",
      salary: "₹25,000 - ₹35,000 /month",
      duration: "3 Months"
    }
    ]
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"> 
        <div className="max-w-7xl mx-auto">
            <div className="mb-10">
             <h1 className="text-3xl font-bold text-gray-900 border-l-4 border-[#00A5EC] pl-4">Available Jobs</h1>   
                </div>
                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Jobs_List.map((job)=> (
                <JobCard
                key={job.id}
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