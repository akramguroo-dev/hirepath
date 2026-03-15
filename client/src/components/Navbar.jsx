export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white text-black p-8">
      <div className="font-bold text-xl">HirePath</div>
      <div className="flex gap-6">
        <a href="">Jobs</a>
        <a href="">Internships</a>
      </div>
      <div className="flex gap-4">
        <button>Login</button>
        <button>Register</button>
      </div>
    </nav>
  );
}