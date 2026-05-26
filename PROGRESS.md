# HirePath - Project Progress

## Team
- Akram Guroo (Lead - Full Stack)
- Dayan Hanief Shah (Frontend)

## Tech Stack
- Frontend: React, Tailwind, React Router, Axios, Framer Motion
- Backend: Node.js, Express, MongoDB Atlas, JWT, Cloudinary

---

## ✅ COMPLETED FEATURES (HirePath v1)

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
- [x] Auto-closing jobs on deadline (Node cron) ✅

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
- [x] Error boundaries (Dayan) — #42 ✅
- [x] Accessibility — aria-labels & keyboard navigation (Dayan) — #43 ✅ MERGED
- [x] Cloudinary uploads — profile photo, resume, logo UI (Akram)
- [x] Profile display with photo + resume download link (Akram)
- [x] Company logo upload & display on job cards (Akram)
- [x] Fix axios.js — remove Content-Type header for FormData (Akram)
- [x] Fix EditProfile & PostJob — add token to upload handlers (Akram)

### Deployment ✅
- [x] Deploy backend to Render — https://hirepath-api.onrender.com
- [x] Deploy frontend to Vercel — https://hirepath-eight.vercel.app
- [x] Set environment variables (Cloudinary on Render)
- [x] Connect frontend to production backend URL
- [x] Write README.md

---

## ✅ WEEK 1: HirePath Polish — COMPLETE
- [x] Error boundaries (Dayan) — #42 ✅
- [x] Accessibility — aria-labels & keyboard navigation (Dayan) — #43 ✅ MERGED
- [x] Cloudinary uploads complete (Akram) — profile photos, resumes, company logos ✅

### Week 1 (Continued): Remaining v1 Features ✅ COMPLETE
- [x] Browse Jobs button on Home page → navigate to /jobs ✅
- [x] Internships route — filter jobs by type using query params ✅
- [x] Employer registration in browser form ✅
- [x] EmployerDashboard tabs — Active/Pending/Closed status filters ✅
- [x] View all postings link + auto-close cron job ✅
- [x] Pending Applications section on EmployerDashboard ✅
- [x] GET /api/applications/employer endpoint ✅

---

## ✅ WEEK 2: Portfolio Site (Next.js + TypeScript) — COMPLETE
- [x] Next.js 15 setup + TypeScript configuration ✅
- [x] File-based routing (Home, About, Projects, Contact) ✅
- [x] TypeScript interfaces + props typing ✅
- [x] ProjectCard reusable component ✅
- [x] Config-driven data management ✅
- [x] Contact form with Formspree integration ✅
- [x] Form validation (client-side) ✅
- [x] Comprehensive About page with learning journey ✅
- [x] Professional README.md ✅
- [x] Deployed to Vercel ✅
- [x] GitHub profile updated ✅

**Portfolio Live:** https://portfolio-puce-six-nm8nojm82f.vercel.app

---

## 🔄 WEEK 3: Chat App (React + Node + Socket.io) — STARTING NOW
- [ ] Express + Socket.io server setup
- [ ] React chat UI (message list, input, user list)
- [ ] Frontend ↔ Backend WebSocket connection (send/receive)
- [ ] Multiple chat rooms/users support
- [ ] Basic online status indicator
- [ ] Deploy backend (Railway/Render) + frontend (Vercel)

---

## Week 4: Dashboard App (React + Redux + Testing) (5 days)
- [ ] React + Redux Toolkit setup
- [ ] Todo/Task dashboard UI (add, delete, filter, mark complete)
- [ ] Redux async thunks (mock API calls)
- [ ] Jest unit tests (reducer tests + component snapshots)
- [ ] Mobile responsive dashboard
- [ ] Deploy to Vercel

---

## Week 5: HirePath v2 — Real-time Chat Integration (5 days)
- [ ] Socket.io backend integration on HirePath
- [ ] Chat UI component for student-employer messaging
- [ ] Redux for chat state management
- [ ] Message notifications & typing indicators
- [ ] Deploy to production (Vercel + Render)

---

## Pending Features (Post-5 weeks)
- [ ] Admin Panel page
- [ ] College/Faculty Dashboard page
- [ ] Job recommendation logic
- [ ] Analytics endpoints
- [ ] Admin routes
- [ ] Dark mode (optional)

---

## Projects Roadmap
1. ✅ HirePath (MERN) — Polish Phase COMPLETE ✅
2. ✅ Portfolio Site (Next.js + TypeScript) — COMPLETE ✅
3. Chat App (React + Node + Socket.io) — STARTING NOW
4. Dashboard App (Redux + Jest) — Week 4
5. HirePath v2 Polish (Real-time Chat) — Week 5

---

## Current Task
- **Akram (Solo):** Week 3 — Chat App (React + Node + Socket.io)
- **Dayan (Standby):** On standby. Available for Week 3 Chat App UI or future HirePath features.

---

## Notes
- Production frontend: https://hirepath-eight.vercel.app
- Production backend: https://hirepath-api.onrender.com
- Portfolio: https://portfolio-puce-six-nm8nojm82f.vercel.app
- **5-Week Sprint Goal:** 4 production projects + strong resume by end of Week 5
- Always paste PROGRESS.md at start of new Claude session

---

## Post-5 Week Plan
- Build resume with all 4 projects + GitHub links
- Resume optimization + shortlisting strategy
- Target startups + internship applications
- Application strategy: 10-15 daily, track responses