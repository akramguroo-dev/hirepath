import { useState } from "react"; 
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); 
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <nav className="bg-white text-black border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-5">
        <div className="font-semibold text-xl py-5">
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
        <div className="hidden md:flex gap-6">
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
          {token && role === "student" && (
            <Link
              to="/profile"
              className="flex items-center gap-1 text-[#484848] font-medium hover:bg-blue-50 hover:text-[#008BDC] transition p-5"
            >
              Profile
            </Link>
          )}
          {token && role === "employer" && (
            <Link
              to="/employer-dashboard"
              className="flex items-center gap-1 text-[#484848] font-bold hover:bg-blue-50 transition p-5 border-l border-gray-50"
            >
              Employer
            </Link>
          )}
        </div>
        <div className="hidden md:flex gap-4">
          {!token && (
            <Link
              to="/login"
              className="px-5 py-2 text-[#008BDC] border border-[#008BDC] rounded font-semibold flex items-center justify-center leading-none"
            >
              Login
            </Link>
          )}
          {!token && (
            <Link
              to="/register"
              className="px-4 py-2 bg-[#00A5EC] text-white rounded font-semibold flex items-center justify-center leading-none"
            >
              Register
            </Link>
          )}
          {token && (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                window.location.href = "/";
              }}
              className="px-5 py-2 text-[#008BDC] border border-[#008BDC] rounded font-semibold flex items-center justify-center leading-none"
            >
              Logout
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-gray-600 p-2 focus:outline-none"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 flex flex-col pb-4">
          <Link to="/jobs" className="p-4 border-b border-gray-50 text-[#484848]" onClick={() => setIsOpen(false)}>Jobs</Link>
          <Link to="/internships" className="p-4 border-b border-gray-50 text-[#484848]" onClick={() => setIsOpen(false)}>Internships</Link>
          
          {token && role === "student" && (
            <Link to="/profile" className="p-4 border-b border-gray-50 text-[#484848]" onClick={() => setIsOpen(false)}>Profile</Link>
          )}
          {token && role === "employer" && (
            <Link to="/employer-dashboard" className="p-4 border-b border-gray-50 font-bold text-[#484848]" onClick={() => setIsOpen(false)}>Employer</Link>
          )}

          <div className="p-4 flex flex-col gap-3">
            {!token && (
              <>
                <Link to="/login" className="w-full py-3 text-center text-[#008BDC] border border-[#008BDC] rounded font-semibold" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/register" className="w-full py-3 text-center bg-[#00A5EC] text-white rounded font-semibold" onClick={() => setIsOpen(false)}>Register</Link>
              </>
            )}
            {token && (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("role");
                  window.location.href = "/";
                }}
                className="w-full py-3 text-[#008BDC] border border-[#008BDC] rounded font-semibold text-center"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}