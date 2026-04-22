# HirePath - Project Progress

## Team
- Akram Guroo (Lead - Full Stack)
- Dayan Hanief Shah (Frontend)
- Umar Tariq (Frontend)

## Tech Stack
- Frontend: React, Tailwind, React Router, Axios
- Backend: Node.js, Express, MongoDB Atlas, JWT

## Completed Features

### Backend
- [x] User auth (register, login, JWT)
- [x] Job CRUD
- [x] Application system
- [x] Employer verification
- [x] Feedback/rating
- [x] Expand User schema for profile data (location, college, skills, education, resume, internships, jobs, projects, accomplishments)
- [x] GET /api/auth/me (getMe route)
- [x] GET /api/jobs/employer (employer specific jobs)
- [x] PUT /api/auth/profile (update profile endpoint)

### Frontend
- [x] Routing setup
- [x] Navbar, Footer
- [x] Home page
- [x] Login page (connected to API)
- [x] Register page (connected to API)
- [x] Jobs page (fetching from backend)
- [x] Job Detail page (fetching from backend)
- [x] Apply Now button (connected to API)
- [x] Student Profile page (connected to API - shows name only, edit profile pending)
- [x] Employer Dashboard (connected to API - shows active jobs)
- [x] Post Job form UI (Dayan)
- [x] Connect Post Job form to backend API (Akram)
- [x] Employer — view applicants per job UI (Dayan)
- [x] Protected routes (Akram)
- [x] Application status page — student view (Dayan)
- [x] Navbar auth state (Akram)
- [x] Student — view feedback received (Dayan)
- [x] Edit Profile page (Akram)
- [x] Feedback form UI (Dayan)

## In Progress
- [ ] Employer — connect applicants to API + accept/reject (Akram)
- [ ] Student Dashboard UI (Umar - feature/student-dashboard)
- [ ] 404 page (Dayan - feature/404-page)

## Pending Features

### Backend
- [ ] Resume upload (Cloudinary)
- [ ] Admin routes
- [ ] Job search/filter endpoint
- [ ] Pagination for jobs
- [ ] Input validation (express-validator)
- [ ] Rate limiting
- [ ] Helmet.js (security)
- [ ] Real-time chat (Socket.io)
- [ ] College/faculty routes
- [ ] Job recommendation logic
- [ ] Analytics endpoints
- [ ] Token expiry handling
- [ ] Role-based access control
- [ ] CORS configuration (restrict to frontend URL in production)

### Frontend
- [ ] Search/filter jobs UI
- [ ] Job filters UI (by type, location, salary)
- [ ] Pagination UI on Jobs page
- [ ] Connect application status page to API (Akram)
- [ ] Connect feedback received to API (Akram)
- [ ] Connect feedback form to API (Akram)
- [ ] Admin Panel page
- [ ] College/Faculty Dashboard page
- [ ] Real-time Chat UI (Socket.io)
- [ ] Toast notification system
- [ ] Loading spinners on all pages
- [ ] Empty states (no jobs, no applications)
- [ ] Mobile hamburger menu
- [ ] Lazy loading for pages
- [ ] Error boundaries
- [ ] Mobile responsiveness check on all pages
- [ ] Animations/transitions (Framer Motion)
- [ ] Company logo upload for employers
- [ ] Profile photo upload for students
- [ ] Proper aria-labels on buttons
- [ ] Keyboard navigation support
- [ ] Color contrast check
- [ ] Dark mode (optional)

### Testing
- [ ] API testing with Jest
- [ ] Basic frontend testing

## Deployment
- [ ] Deploy frontend to Netlify
- [ ] Deploy backend to Render
- [ ] Set environment variables
- [ ] Connect frontend to production backend URL
- [ ] Write README.md

## Current Task
- Akram: Employer — connect EmployerApplicants to API + accept/reject
- Dayan: 404 page (feature/404-page)
- Umar: Student Dashboard UI (feature/student-dashboard)

## Notes
- MongoDB Atlas cluster: nodetuts.amqi2r8.mongodb.net
- Frontend runs on: localhost:5173
- Backend runs on: localhost:5000
- Rule: Only UI/frontend tasks for team. API connection and backend is Akram's job.