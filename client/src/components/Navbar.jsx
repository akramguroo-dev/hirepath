export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white text-black px-5">
      <div className="font-semibold text-xl">
        <a href="" className="inline-block">
          <span className="text-[#008BDC]">HIRE</span>
          <span className="text-[#484848] relative">
            PATH
            <img src="/logo.png" alt="" className="absolute -top-2 -right-7 w-6 h-6" />
          </span>
        </a>
      </div>
      <div className="flex gap-6">
        <a className="flex items-center gap-1 text-[#484848] font-medium hover:bg-blue-50 hover:text-[#008BDC] transition p-5" href="">
          Jobs <span className="text-2xl">▾</span>
        </a>
        <a className="flex items-center gap-1 text-[#484848] font-medium hover:bg-blue-50 hover:text-[#008BDC] transition p-5" href="">
          Internships <span className="text-2xl">▾</span>
        </a>
      </div>
      <div className="flex gap-4">
        <button className="px-5 py-2 text-[#008BDC] border border border-[#008BDC] rounded font-semibold leading-none cursor-pointer">
          Login
        </button>
        <button className="px-4 py-2 bg-[#00A5EC] text-white rounded font-semibold leading-none cursor-pointer">
          Register
        </button>
      </div>
    </nav>
  );
}