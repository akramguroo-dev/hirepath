import { lazy, Suspense } from "react";
import { Routes, Route ,useLocation } from "react-router-dom";

import {Toaster} from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Jobs = lazy(() => import("./pages/Jobs"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const Profile = lazy(() => import("./pages/Profile"));
const EmployerDashboard = lazy(() => import("./pages/EmployerDashboard"));
const EmployerApplicants = lazy(() => import("./pages/EmployerApplicants"));
const PostJob = lazy(() => import("./pages/PostJob"));
const ApplicationStatus = lazy(() => import("./pages/ApplicationStatus"));
const FeedbackReceived = lazy(() => import("./pages/FeedbackReceived"));
const FeedbackForm = lazy(() => import("./pages/FeedbackForm"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));

function App() {
  const location = useLocation();
  return (
    <>
    <Toaster/>
      <Navbar />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#008BDC] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname} // Unique key triggers animation on route change
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
      <Routes location={location} key={location.pathname}>
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
      </motion.div>
      </AnimatePresence>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
