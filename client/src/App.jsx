import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Profile from "./pages/Profile";
import EmployerDashboard from "./pages/EmployerDashboard";
import PostJob from "./pages/PostJob";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs/>} />
        <Route path="/jobs/:id" element={<JobDetail/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard/>}/>
        <Route path="/post-job" element={<PostJob/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
