import { useState } from "react";
import { useParams } from "react-router-dom";

export default function FeedbackForm() {
  const { applicationId } = useParams();
  const [formData, setFormData] = useState({
    studentName: '', 
    jobTitle: '',
    rating: 5,
    comment: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted for ID:", applicationId, formData);
    alert("Feedback submitted successfully (UI Only)");
  };
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
          Give Student Feedback
        </h1>
        <div className="bg-white rounded-xl shadow-md overflow-hidden border-t-8 border-[#008BDC] p-6 md:p-10">
          <p className="text-gray-500 mb-6 text-sm">Ref ID: {applicationId}</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Student Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
                placeholder="e.g. Dayan Shah"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
                placeholder="e.g. Frontend Developer"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Comment</label>
              <textarea
                rows="6"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008BDC] focus:border-transparent outline-none transition-all"
                placeholder="Describe the student's performance..."
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#008BDC] hover:bg-[#0076bb] text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform active:scale-95"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}