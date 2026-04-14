import { Link, useParams } from 'react-router-dom';
export default function EmployerApplicants() {
  const { id } = useParams();
  const applicants = [
    { id: 1, name: "Dayan Shah", email: "dayan@example.com", status: "Accepted", date: "2026-04-12" },
    { id: 2, name: "Akram Guroo", email: "akram@example.com", status: "Pending", date: "2026-04-13" },
    { id: 3, name: "Umer Tariq", email: "umer@example.com", status: "Rejected", date: "2026-04-10" },
  ];
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-700 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <Link to="/employer-dashboard" className="text-blue-600 hover:underline flex items-center mb-6 font-medium">
          <span className="mr-2">←</span> Back to Employer Dashboard
        </Link>
    
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Applicants for <span className="text-blue-600">Frontend Developer</span>
        </h1> 
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Applicant Name</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Applied Date</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applicants.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 font-medium text-gray-900">{app.name}</td>
                  <td className="px-6 py-4 text-gray-600">{app.email}</td>
                  <td className="px-6 py-4 text-gray-600">{app.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-400">Showing {applicants.length} candidates</p>
          </div>
        </div>
      </div>
    </div>
  );
}