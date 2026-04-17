export default function ApplicationStatus(){
    const applications = [
        {id:1, title:"Frontend Developer", company:"TechFlow Solutions", date:"2026-04-10",status:"Accepted"},
        { id: 2, title: "UI/UX Designer", company: "Creative Minds Hub", date: "2026-04-12", status: "Pending"}, 
        {id:3 ,title:"Backend Intern", company:"HirePath Systems",date:"2026-04-08",status:"Rejected"},
       ];
       const getStatusStyle =(status) =>{
        switch(status){
        case 'Accepted': return 'bg-green-100 text-green-700 border-green-200';
        case 'Rejected' : return 'bg-red-100 text-red-700 border-red-200' ;
        default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }
       };
       return(
        <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-10 font-sans">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[#212121]">My Applications</h1>
                    <p className="text-gray-500 mt-1">Track the progress of your job and internship applications.</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">  
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Job Title</th>
                        <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Company</th>
                        <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Applied Date</th>
                        <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Status</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {applications.map((app)=>(
                       <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-[#008BDC]">{app.title}</td>
                        <td className="px-6 py-4 text-gray-700 font-medium">{app.company}</td>
                        <td className="px-6 py-4 text-gray-500 text-sm">{app.date}</td>
                        <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(app.status)}`}> {app.status}</span>
                           </td>
                       </tr> 
                    ))}
                    </tbody>
                    </table>  
                    {applications.length === 0 &&(
                        <div className="p-12 text-center text-gray-400">
                            No applications found. Go find your dream internship!
                        </div>
                    )}   
                </div>
            </div>
        </div>
       );
}