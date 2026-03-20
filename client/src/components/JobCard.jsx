export default function JobCard({ title, company, location, salary, duration }) {
  const Path = ({ type }) => {
    const paths = {
      hiring: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" />,
      loc: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />,
      pay: <rect x="2" y="6" width="20" height="12" rx="2" />,
      dur: <rect x="3" y="4" width="18" height="18" rx="2" />
    };
    return (
      <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        {paths[type]}
      </svg>
    );
  };
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group flex flex-col w-full text-left">
      <div className="flex items-center gap-1.5 border border-blue-50 w-fit px-2 py-0.5 rounded text-[10px] text-[#00A5EC] font-bold mb-4 bg-[#F0F9FF]">
        <div className="w-3 h-3"><Path type="hiring"/></div> 
        Actively hiring
      </div>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 pr-4">
          <h3 className="text-gray-900 font-bold text-[17px] leading-tight group-hover:text-[#00A5EC] transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-400 text-[13px] mt-1 font-medium">{company}</p>
        </div>
        <div className="w-14 h-14 border border-gray-100 rounded-lg flex items-center justify-center text-[8px] text-gray-300 font-bold flex-shrink-0 bg-white">
          LOGO
        </div>
      </div>
      <hr className="border-gray-50 mb-5" />
      <div className="space-y-3 mb-6 text-[13px] font-medium text-gray-500">
        <div className="flex items-center gap-3">
          <div className="w-[14px] h-[14px] text-gray-400"><Path type="loc"/></div> 
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-[14px] h-[14px] text-gray-400"><Path type="pay"/></div> 
          <span>{salary}</span>
        </div>
        {duration && (
          <div className="flex items-center gap-3">
            <div className="w-[14px] h-[14px] text-gray-400"><Path type="dur"/></div> 
            <span>{duration}</span>
          </div>
        )}
      </div>
      <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
        <span className="bg-gray-50 px-2 py-1 rounded border border-gray-100">Internship</span>
        <button className="text-[#00A5EC] text-sm font-bold hover:underline lowercase first-letter:uppercase tracking-normal transition-colors">
          View details ›
        </button>
      </div>
    </div>
  );
}