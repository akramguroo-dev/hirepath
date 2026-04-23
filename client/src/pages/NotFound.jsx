import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 overflow-hidden">
      <div className="relative text-center">
        <h1 className="text-[12rem] md:text-[18rem] font-black text-[#008BDC] opacity-5 select-none leading-none">
          404
        </h1>
        <div className="relative -mt-20 md:-mt-32">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
           Oops! Page not found
          </h2>
          <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">
            The page you are looking for doesn't exist or has been moved. 
            Let's get you back to the HirePath dashboard.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center bg-[#008BDC] hover:bg-[#0076bb] text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-blue-200 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}