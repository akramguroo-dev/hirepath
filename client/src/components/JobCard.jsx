export default function JobCard() {
  const jobs = [
    { id: 1, t: "Learner Success", c: "USDC Projects India", l: "Bangalore", p: "₹ 8,000 - 10,000 /mo", d: "5 Months" },
    { id: 2, t: "Data Scientist", c: "DataLabs Analytics", l: "Mumbai", p: "₹ 15,000 /mo", d: "6 Months" },
    { id: 3, t: "UI/UX Designer", c: "Creative Minds", l: "Remote", p: "₹ 12,000 /mo", d: "3 Months" },
    { id: 4, t: "Web Developer", c: "TechFlow Solutions", l: "Srinagar", p: "₹ 20,000 /mo", d: "6 Months" }
  ];
  const svg = (p) => <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">{p}</svg>;
  return (
    <div className="bg-[#F8FBFF] min-h-screen py-6 md:py-10 px-4 md:px-6 font-sans text-gray-600 antialiased">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8 ml-1">Internships</h2>
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          {["Big brands", "Data Science", "Design", "Web Development"].map((tab, i) => (
            <button key={i} className={`whitespace-nowrap px-4 py-2 rounded-full border text-xs md:text-sm font-medium flex-shrink-0 ${i === 0 ? 'bg-[#00A5EC] text-white border-[#00A5EC]' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'}`}>{tab}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {jobs.map((j) => (
            <div key={j.id} className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-xl transition-all group flex flex-col min-h-[360px]">
              <div className="flex items-center gap-1.5 border border-blue-50 w-fit px-2 py-1 rounded text-[10px] text-[#00A5EC] font-bold mb-5 bg-[#F0F9FF]">
                <div className="w-3 h-3">{svg(<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>)}</div> Actively hiring
              </div>
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 pr-2"><h3 className="text-gray-900 font-bold text-[16px] md:text-[17px] leading-tight group-hover:text-[#00A5EC] line-clamp-2">{j.t}</h3><p className="text-gray-400 text-[12px] mt-1 font-medium">{j.c}</p></div>
                <div className="w-12 h-12 md:w-14 md:h-14 border border-gray-100 rounded-lg flex items-center justify-center text-[8px] text-gray-200 font-black flex-shrink-0">LOGO</div>
              </div>
              <hr className="border-gray-50 my-4 md:my-5" />
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 text-[13px] font-medium text-gray-400">
                <div className="flex items-center gap-3"><div className="w-[14px] h-[14px]">{svg(<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>)}</div>{j.l}</div>
                <div className="flex items-center gap-3"><div className="w-[14px] h-[14px]">{svg(<><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/></>)}</div>{j.p}</div>
                <div className="flex items-center gap-3"><div className="w-[14px] h-[14px]">{svg(<><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>)}</div>{j.d}</div>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <span className="bg-gray-50 px-2 py-1 rounded border border-gray-100">Internship</span>
                <button className="text-[#00A5EC] text-sm group-hover:underline lowercase first-letter:uppercase tracking-normal">View details ›</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}