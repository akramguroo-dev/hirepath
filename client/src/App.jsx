import { Routes, Route } from "react-router-dom";

import {Toaster} from "react-hot-toast"
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
import FeedbackForm from "./pages/FeedbackForm";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <>
    <Toaster/>
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
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <ApplicationStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-feedback"
          element={
            <ProtectedRoute>
              <FeedbackReceived />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
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
          element={<EmployerApplicants />}
        />
        <Route path="/feedback/:applicationId" element={<FeedbackForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
