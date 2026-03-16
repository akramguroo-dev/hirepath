import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8 px-5 border-t border-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="flex-1">
            <h3 className="text-[#00A5EC] font-bold text-lg mb-4 uppercase tracking-wider">About</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              HirePath is an integrated platform for students to find jobs, 
              internships, and manage their college career path efficiently.
            </p>
          </div>
          <div className="flex-1 md:text-center">
            <h3 className="text-[#00A5EC] font-bold text-lg mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="text-gray-300 text-sm space-y-3">
              <li><a href="#" className="hover:text-white transition">Find Jobs</a></li>
              <li><a href="#" className="hover:text-white transition">Internships</a></li>
              <li><a href="#" className="hover:text-white transition">Our Services</a></li>
            </ul>
          </div>
          <div className="flex-1 md:text-right">
            <h3 className="text-[#00A5EC] font-bold text-lg mb-4 uppercase tracking-wider">Contact</h3>
            <ul className="text-gray-300 text-sm space-y-3">
              <li>Email: support@hirepath.com</li>
              <li>Location: Srinagar, J&K</li>
              <li>Help Center</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} HirePath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}