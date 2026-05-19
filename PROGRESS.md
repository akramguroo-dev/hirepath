# HirePath - Project Progress

## Team
- Akram Guroo (Lead - Full Stack)
- Dayan Hanief Shah (Frontend)

## Tech Stack
- Frontend: React, Tailwind, React Router, Axios, Framer Motion
- Backend: Node.js, Express, MongoDB Atlas, JWT, Cloudinary

## Completed Features

### Backend
- [x] User auth (register, login, JWT)
- [x] Job CRUD
- [x] Application system
- [x] Employer verification
- [x] Feedback/rating
- [x] Expand User schema for profile data
- [x] GET /api/auth/me (getMe route)
- [x] GET /api/jobs/employer (employer specific jobs)
- [x] PUT /api/auth/profile (update profile endpoint)
- [x] Job search/filter endpoint (search, type, location, status)
- [x] Input validation (express-validator) on auth routes
- [x] Rate limiting on auth routes
- [x] Helmet.js (security headers)
- [x] CORS configuration (restricted to frontend URL)
- [x] Fix applicants count increment on apply
- [x] Pagination for jobs
- [x] Token expiry handling — Axios interceptor (frontend)
- [x] Role-based access control — middleware
- [x] Cloudinary integration — upload routes (profile photo, resume, logo)
- [x] Job schema — add companyLogo field

### Frontend
- [x] Routing setup
- [x] Navbar, Footer
- [x] Home page
- [x] Login page (connected to API)
- [x] Register page (connected to API)
- [x] Jobs page (fetching from backend)
- [x] Job Detail page (fetching from backend)
- [x] Apply Now button (connected to API)
- [x] Student Profile page (connected to API)
- [x] Employer Dashboard (connected to API)
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
- [x] Profile page fixes + My Applications + My Feedback + My Dashboard buttons (Akram)
- [x] 404 page (Dayan)
- [x] Connect feedback received to API (Akram)
- [x] Connect feedback form to API (Akram)
- [x] Job search/filter UI (Akram)
- [x] Mobile hamburger menu (Dayan)
- [x] Student Dashboard UI (Dayan)
- [x] Toast notification system (Dayan + Akram fix)
- [x] Connect Student Dashboard to API (Akram)
- [x] Loading spinners on all pages (Dayan)
- [x] Refactor to async/await with finally (Akram)
- [x] Profile page — display skills, college, education fields (Akram)
- [x] Edit Profile — add degree, year fields (Akram)
- [x] EmployerDashboard — show employer's actual name (Akram)
- [x] Fix applicants count display on Employer Dashboard (Akram)
- [x] EmployerApplicants — alignment fix + async/await refactor (Akram)
- [x] Empty states on all pages (Dayan)
- [x] AuthContext refactor — replace window.location.href (Akram)
- [x] Profile completeness — dynamic calculation (Dayan)
- [x] Mobile responsiveness check on all pages (Dayan)
- [x] Feedback button — conditional logic (Akram)
- [x] README.md (Dayan + Akram fixes)
- [x] Pagination for jobs UI (Akram)
- [x] Animations/transitions — Framer Motion (Dayan)
- [x] Token expiry handling — Axios interceptor (Akram)
- [x] Lazy loading for pages (Dayan)
- [x] Error boundaries (Dayan) — #42
- [x] Cloudinary uploads — profile photo, resume, logo UI (Akram)
- [x] Profile display with photo + resume download link (Akram)
- [x] Company logo upload & display on job cards (Akram)
- [x] Fix axios.js — remove Content-Type header for FormData (Akram)
- [x] Fix EditProfile & PostJob — add token to upload handlers (Akram)

## Deployment ✅
- [x] Deploy backend to Render — https://hirepath-api.onrender.com
- [x] Deploy frontend to Vercel — https://hirepath-eight.vercel.app
- [x] Set environment variables (Cloudinary on Render)
- [x] Connect frontend to production backend URL
- [x] Write README.md

## Week 1: HirePath Polish ✅ COMPLETE
- [x] Error boundaries (Dayan) — #42 ✅
- [x] Accessibility — aria-labels & keyboard navigation (Dayan) — #43 ✅ MERGED
- [x] Cloudinary uploads complete (Akram) — profile photos, resumes, company logos ✅

## Week 1 (Continued): Remaining v1 Features — BEFORE Week 2 STARTS
- [ ] Browse Jobs button on Home page → navigate to /jobs
- [ ] Internships route — filter jobs by type (or use /jobs with filter)
- [ ] Employer registration in browser form (currently Student only)
- [ ] EmployerDashboard tabs — Active/Pending/Closed status filters
- [ ] View all postings link on EmployerDashboard

## Week 2: Portfolio Site (Next.js + TypeScript) (5 days) — STARTING AFTER v1 FEATURES
- [ ] Next.js 15 setup + TypeScript configuration
- [ ] Basic routing (Home, About, Projects, Contact pages)
- [ ] TypeScript interfaces + props typing for all components
- [ ] Projects grid UI (showcase HirePath + other projects)
- [ ] About section with bio + tech stack overview
- [ ] Contact form (Formspree or Nodemailer backend)
- [ ] Mobile responsiveness + SEO optimization
- [ ] Deploy to Vercel

## Week 3: Chat App (React + Node + Socket.io) (5 days)
- [ ] Express + Socket.io server setup
- [ ] React chat UI (message list, input, user list)
- [ ] Frontend ↔ Backend WebSocket connection (send/receive)
- [ ] Multiple chat rooms/users support
- [ ] Basic online status indicator
- [ ] Deploy backend (Railway/Render) + frontend (Vercel)

## Week 4: Dashboard App (React + Redux + Testing) (5 days)
- [ ] React + Redux Toolkit setup
- [ ] Todo/Task dashboard UI (add, delete, filter, mark complete)
- [ ] Redux async thunks (mock API calls)
- [ ] Jest unit tests (reducer tests + component snapshots)
- [ ] Mobile responsive dashboard
- [ ] Deploy to Vercel

## Week 5: HirePath v2 — Real-time Chat Integration (5 days)
- [ ] Socket.io backend integration on HirePath
- [ ] Chat UI component for student-employer messaging
- [ ] Redux for chat state management
- [ ] Message notifications & typing indicators
- [ ] Deploy to production (Vercel + Render)

## Pending Features (Post-5 weeks)
- [ ] Admin Panel page
- [ ] College/Faculty Dashboard page
- [ ] Job recommendation logic
- [ ] Analytics endpoints
- [ ] Admin routes
- [ ] Dark mode (optional)

## Projects Roadmap
1. ✅ HirePath (MERN) — Polish Phase COMPLETE ✅
2. Portfolio Site (Next.js + TypeScript) — Week 2
3. Chat App (React + Node + Socket.io) — Week 3
4. Dashboard App (Redux + Jest) — Week 4
5. HirePath v2 Polish (Real-time Chat) — Week 5

## Testing
- [ ] API testing with Jest
- [ ] Basic frontend testing

## Current Task
- **Akram (Solo):** Week 2 — Portfolio Site (Next.js + TypeScript)
- **Dayan (Standby):** On standby. Learning resources: Next.js docs, TypeScript handbook. Will be involved in Week 3 Chat App UI or future HirePath features.

## Notes
- MongoDB Atlas cluster: nodetuts.amqi2r8.mongodb.net
- Production frontend: https://hirepath-eight.vercel.app
- Production backend: https://hirepath-api.onrender.com
- Local frontend: localhost:5173
- Local backend: localhost:5000
- Cloudinary account: dedx4wnca
- **Work Allocation:** Weeks 2-5 projects are AKRAM SOLO (full-stack learning). Dayan available for Week 3+ UI/frontend tasks on HirePath features.
- **5-Week Sprint Goal:** 4 production projects + strong resume by end of Week 5
- Always paste PROGRESS.md at start of new Claude session

## Post-5 Week Plan
- Build resume with all 4 projects + GitHub links
- Resume optimization + shortlisting strategy
- Target startups + internship applications
- Application strategy: 10-15 daily, track responses