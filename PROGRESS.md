# HirePath - Project Progress

## Team
- Akram Guroo (Lead - Full Stack)
- Dayan Hanief Shah (Frontend)

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
- [x] Employer — connect applicants to API + accept/reject (Akram)
- [x] Connect application status page to API (Akram)
- [x] Profile page fixes + My Applications + My Feedback buttons side by side (Akram)
- [x] 404 page (Dayan)
- [x] Connect feedback received to API (Akram)
- [x] Connect feedback form to API (Akram)

## In Progress
- [ ] Job search/filter endpoint + UI (Akram)
- [ ] Mobile hamburger menu (Dayan - feature/hamburger-menu)

## Pending Core Features

### Backend
- [ ] Job search/filter endpoint
- [ ] Pagination for jobs
- [ ] Input validation (express-validator)
- [ ] Rate limiting
- [ ] Helmet.js (security)
- [ ] CORS configuration (restrict to frontend URL in production)
- [ ] Token expiry handling
- [ ] Role-based access control

### Frontend
- [ ] Search/filter jobs UI
- [ ] Job filters UI (by type, location, salary)
- [ ] Pagination UI on Jobs page
- [ ] Student Dashboard UI (Dayan)

## Deployment
- [ ] Deploy backend to Render
- [ ] Deploy frontend to Netlify
- [ ] Set environment variables
- [ ] Connect frontend to production backend URL
- [ ] Write README.md

## Polish Phase (After Deployment)
- [ ] Navbar auth state — proper fix with AuthContext (replace window.location.href)
- [ ] Feedback button — only show for accepted applications without feedback
- [ ] Profile page — display skills, college, education fields properly
- [ ] Profile completeness — calculate dynamically based on filled fields
- [ ] EmployerDashboard — show employer's actual name instead of "Company HR"
- [ ] All pages — loading spinners
- [ ] All pages — empty states
- [ ] Mobile responsiveness check on all pages
- [ ] Animations/transitions (Framer Motion)
- [ ] Toast notification system
- [ ] Error boundaries
- [ ] Lazy loading for pages
- [ ] Accessibility (aria-labels, keyboard navigation, color contrast)
- [ ] Company logo upload for employers
- [ ] Profile photo upload for students
- [ ] Resume upload (Cloudinary)
- [ ] Admin Panel page
- [ ] College/Faculty Dashboard page
- [ ] Real-time chat (Socket.io)
- [ ] College/faculty routes + dashboard
- [ ] Job recommendation logic
- [ ] Analytics endpoints
- [ ] Admin routes
- [ ] Dark mode (optional)

## Projects Roadmap (Parallel to Polish Phase)
- [ ] Portfolio Site (Next.js + TypeScript) — deploy on Vercel
- [ ] Chat App (React + Node + Socket.io) — learn Socket.io before adding to HirePath
- [ ] Add real-time chat to HirePath
- [ ] Dashboard App (React + Redux Toolkit + TypeScript + Jest)

## Testing
- [ ] API testing with Jest
- [ ] Basic frontend testing

## Current Task
- Akram: Job search/filter endpoint + UI
- Dayan: Mobile hamburger menu (feature/hamburger-menu)

## Notes
- MongoDB Atlas cluster: nodetuts.amqi2r8.mongodb.net
- Frontend runs on: localhost:5173
- Backend runs on: localhost:5000
- Rule: Only UI/frontend tasks for team. API connection and backend is Akram's job.
- Always paste PROGRESS.md at start of new Claude session