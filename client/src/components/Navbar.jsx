import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white text-black px-5 border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="font-semibold text-xl">
        <Link to="/" className="inline-block">
          <span className="text-[#008BDC]">HIRE</span>
          <span className="text-[#484848] relative">
            PATH
            <img
              src="/logo.png"
              alt=""
              className="absolute -top-2 -right-7 w-6 h-6"
            />
          </span>
        </Link>
      </div>
      <div className="flex gap-6">
        <Link
          to="/jobs"
          className="flex items-center gap-1 text-[#484848] font-medium hover:bg-blue-50 hover:text-[#008BDC] transition p-5"
        >
          Jobs <span className="text-2xl">▾</span>
        </Link>
        <Link
          to="/internships"
          className="flex items-center gap-1 text-[#484848] font-medium hover:bg-blue-50 hover:text-[#008BDC] transition p-5"
        >
          Internships <span className="text-2xl">▾</span>
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-1 text-[#484848] font-medium hover:bg-blue-50 hover:text-[#008BDC] transition p-5"
        >
          Profile  
        </Link>
        <Link
          to="/employer-dashboard"
          className="flex items-center gap-1 text-[#484848] font-bold hover:bg-blue-50 transition p-5 border-l border-gray-50"
        >
          Employer
        </Link>
        <Link
  to="/employer/jobs/1/applicants"
  className="flex items-center gap-1 text-[#484848] font-bold hover:bg-blue-50  transition p-5 border-l border-gray-50"
>
  Applicants
</Link>
      </div>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-5 py-2 text-[#008BDC] border border-[#008BDC] rounded font-semibold flex items-center justify-center leading-none"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-[#00A5EC] text-white rounded font-semibold flex items-center justify-center leading-none"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}