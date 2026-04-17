export default function FeedbackReceived (){
    const feedbacks =[
        {id: 1, title: "Fullstack Developer", employer: "Akram Guroo", rating: 5, comment: "Excellent logic"},
        { id: 2, title: "UI/UX Designer", employer: "Umer", rating: 4, comment: "Good sense of spacing, but check mobile responsiveness" },
        {id:3,title: "Backend Intern", employer: "dayan", rating: 3, comment: "Focus more on API error handling"},
    ];
    return(
        <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-10 font-sans">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[#212121]">Feedback Received</h1>
                    <p className="text-gray-500 mt-1">Direct feedback and ratings from employers on your applications.</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase">Job Title</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase">Employer</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase">Rating</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase">Comment</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {feedbacks.map((item)=>(
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td  className="px-6 py-4 font-semibold text-[#008BDC]">{item.title}</td>
                            <td className="px-6 py-4 text-gray-700 font-medium">{item.employer}</td>
                            <td className="px-6 py-4">
                            <div className="flex text-yellow-500 text-sm font-bold items-center">
                      {item.rating} / 5
                      <span className="ml-1">⭐</span>
                    </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600 text-sm italic italic">
                        "{item.comment}"
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {feedbacks.length ===0 &&(
                    <div className="p-12 text-center text-gray-400">
                        No feedback received yet. Keep applying!
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}