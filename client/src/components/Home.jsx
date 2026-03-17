export default function Home() {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          Find Your Dream <span className="text-yellow-400">Internship</span>
        </h1>
        <p className="text-xl mb-8">
          Connect with top companies and launch your career
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 cursor-pointer">
          Browse Jobs
        </button>
        <p className="text-sm mt-4 opacity-80">
          10K+ openings daily
        </p>
      </div>
    </div>
  );
}