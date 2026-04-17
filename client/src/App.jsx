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
import EmployerApplicants from "./pages/EmployerApplicants";
import PostJob from "./pages/PostJob";
import ApplicationStatus from "./pages/ApplicationStatus";
import ProtectedRoute from "./components/ProtectedRoute";
import FeedbackReceived from "./pages/FeedbackReceived";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer-dashboard"
          element={
            <ProtectedRoute>
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/employer/jobs/:id/applicants"
          element={<EmployerApplicants />}/>
         <Route path="/my-feedback" element={<FeedbackReceived />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
