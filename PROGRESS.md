# HirePath - Project Progress (Updated)

## Team
- Akram Guroo (Lead - Full Stack)
- Dayan Hanief Shah (Frontend - Standby)

## Tech Stack
- Frontend: React, Tailwind, React Router, Axios, Framer Motion
- Backend: Node.js, Express, MongoDB Atlas, JWT, Cloudinary
- Real-time: Socket.io (JWT-authenticated sockets)

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
- [x] Auto-closing jobs on deadline (Node cron)

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
- [x] Post Job form UI
- [x] Connect Post Job form to backend API
- [x] Employer — view applicants per job UI
- [x] Protected routes
- [x] Application status page — student view
- [x] Navbar auth state
- [x] Student — view feedback received
- [x] Edit Profile page
- [x] Feedback form UI
- [x] Employer — connect applicants to API + accept/reject
- [x] Connect application status page to API
- [x] Profile page fixes + My Applications + My Feedback + My Dashboard
- [x] 404 page
- [x] Connect feedback received to API
- [x] Connect feedback form to API
- [x] Job search/filter UI
- [x] Mobile hamburger menu
- [x] Student Dashboard UI
- [x] Toast notification system
- [x] Connect Student Dashboard to API
- [x] Loading spinners on all pages
- [x] Refactor to async/await with finally
- [x] Profile page — display skills, college, education fields
- [x] Edit Profile — add degree, year fields
- [x] EmployerDashboard — show employer's actual name
- [x] Fix applicants count display on Employer Dashboard
- [x] EmployerApplicants — alignment fix + async/await refactor
- [x] Empty states on all pages
- [x] AuthContext refactor — replace window.location.href
- [x] Profile completeness — dynamic calculation
- [x] Mobile responsiveness check on all pages
- [x] Feedback button — conditional logic
- [x] README.md
- [x] Pagination for jobs UI
- [x] Animations/transitions — Framer Motion
- [x] Token expiry handling — Axios interceptor
- [x] Lazy loading for pages
- [x] Error boundaries
- [x] Accessibility — aria-labels & keyboard navigation
- [x] Cloudinary uploads — profile photo, resume, logo UI
- [x] Profile display with photo + resume download link
- [x] Company logo upload & display on job cards
- [x] Fix axios.js — remove Content-Type header for FormData
- [x] Fix EditProfile & PostJob — add token to upload handlers

### Deployment ✅
- [x] Deploy backend to Render — https://hirepath-api.onrender.com
- [x] Deploy frontend to Vercel — https://hirepath-eight.vercel.app
- [x] Set environment variables (Cloudinary on Render)
- [x] Connect frontend to production backend URL
- [x] Write README.md

---

## ✅ WEEK 1: HirePath Polish — COMPLETE
- [x] Error boundaries
- [x] Accessibility — aria-labels & keyboard navigation
- [x] Cloudinary uploads complete (profile photos, resumes, company logos)
- [x] Browse Jobs button on Home page → navigate to /jobs
- [x] Internships route — filter jobs by type using query params
- [x] Employer registration in browser form
- [x] EmployerDashboard tabs — Active/Pending/Closed status filters
- [x] View all postings link + auto-close cron job
- [x] Pending Applications section on EmployerDashboard
- [x] GET /api/applications/employer endpoint

---

## ✅ WEEK 2: Portfolio Site (Next.js + TypeScript) — COMPLETE
- [x] Next.js 15 setup + TypeScript configuration
- [x] File-based routing (Home, About, Projects, Contact)
- [x] TypeScript interfaces + props typing
- [x] ProjectCard reusable component
- [x] Config-driven data management
- [x] Contact form with Formspree integration
- [x] Form validation (client-side)
- [x] Comprehensive About page with learning journey
- [x] Professional README.md
- [x] Deployed to Vercel — https://portfolio-puce-six-nm8nojm82f.vercel.app
- [x] GitHub profile updated

---

## ✅ WEEK 3: Chat App (React + Node + Socket.io) — COMPLETE
- [x] Express + Socket.io server setup
- [x] React chat UI (message list, input, room selector)
- [x] Frontend ↔ Backend WebSocket connection (send/receive)
- [x] Multiple chat rooms support (general, tech, random)
- [x] MongoDB message persistence
- [x] User join/leave notifications
- [x] Connection status indicator (online/offline)
- [x] Auto-scroll to latest messages
- [x] Message history loading on room join
- [x] Professional styling (gradients, animations)
- [x] Deploy backend to Render — https://chat-app-backend-jued.onrender.com
- [x] Deploy frontend to Vercel — https://chat-app-seven-self-31.vercel.app
- [x] Socket.io CORS configuration
- [x] Comprehensive README.md with live links

**Chat App Live:** https://chat-app-seven-self-31.vercel.app

---

## ✅ WEEK 4: Dashboard App (React + Redux + TypeScript + Jest) — COMPLETE
- [x] Vite + React setup
- [x] Redux Toolkit + TypeScript configuration
- [x] Task slice with reducers (addTask, toggleTask, deleteTask, etc.)
- [x] Redux Provider + Store setup
- [x] TaskInput component (add tasks with Enter key support)
- [x] TaskList component (display, filter, delete tasks)
- [x] Task filtering (All / Active / Completed)
- [x] Professional CSS styling (gradients, animations, responsive)
- [x] Jest configuration + ts-jest setup
- [x] 16 unit tests for Redux reducer
- [x] 9 integration tests for React components
- [x] 25 total tests (all passing)
- [x] TypeScript interfaces for Task & TaskState
- [x] Type-safe Redux hooks (useDispatch, useSelector)
- [x] Test setup with @testing-library/react
- [x] Mobile responsive design
- [x] Deploy to Vercel — https://dashboard-gold-theta-32.vercel.app
- [x] Comprehensive README.md with test coverage details
- [x] Semantic git commits with professional history

**Dashboard Live:** https://dashboard-gold-theta-32.vercel.app

---

## ✅ WEEK 5: HirePath v2 — Real-time Chat Integration — COMPLETE

### Backend
- [x] Socket.io installed and integrated into existing Express server (`http.createServer` + `server.listen`, not `app.listen`)
- [x] `Conversation` schema (job_id, student_id, employer_id, last_message, last_message_at, unread_count_student, unread_count_employer, status)
- [x] `Message` schema (conversation_id, sender_id, text, read, createdAt) with indexes on conversation_id and createdAt
- [x] `chatController.js` — REST endpoints: getConversations, getOrCreateConversation, getMessages, markMessagesAsRead
- [x] `chat.js` routes mounted at `/api/chat`, protected by authMiddleware
- [x] `socketHandler.js` — JWT-authenticated Socket.io middleware (verifies token on handshake, attaches user to socket)
- [x] Socket.io events: joinConversation, leaveConversation, sendMessage, typing, stopTyping, markAsRead, disconnect
- [x] Real-time broadcast of new messages to all sockets in a conversation room
- [x] Unread count increment (sender side) and reset (recipient side, on markAsRead)

### Frontend
- [x] `socket.js` utility — Socket.io client with JWT auth, auto-reconnect
- [x] `ChatList.jsx` — conversation list with unread badges, last-message preview, relative timestamps
- [x] `ChatWindow.jsx` — message thread with real-time updates, auto-scroll, typing indicator, Enter-to-send
- [x] `ChatPage.jsx` — combines ChatList + ChatWindow, fetches conversations, refreshes list on new message / read
- [x] `/messages` route added (protected, wrapped in ErrorBoundary)
- [x] Messages link added to Navbar (desktop + mobile)
- [x] "Message" button added to EmployerApplicants page — creates/opens conversation with an applicant directly from the applicants table
- [x] `AuthContext` extended with `user` object (fetched from `/api/auth/me`) for sender-identity comparisons in chat UI

### Debugging & Fixes (real production issues resolved)
- [x] Fixed `app.listen()` → `server.listen()` so Socket.io actually attaches to the running server
- [x] Fixed Render deploy config (Root Directory + Build/Start commands) after path-resolution failures
- [x] Fixed JWT payload mismatch — token has `{ userId, role }`, not `{ id, name }` — corrected in socketHandler and chatController (`req.user._id`, not `req.user.id`)
- [x] Fixed double `/api/api/` prefix bug in frontend axios calls
- [x] Added missing request interceptor to axios.js so JWT is sent automatically on every request (chat endpoints were silently unauthenticated before this)
- [x] Fixed `/auth/me` response shape mismatch — backend wraps in `{ user: {...} }`, frontend was storing the wrapper instead of unwrapping it
- [x] Fixed `getMe` controller excluding `_id` from the response, which broke all sender/recipient identity checks in chat
- [x] Fixed ObjectId vs string comparison bug in `markMessagesAsRead` (unread badge wasn't clearing for either role)
- [x] Fixed typing indicator — socket now looks up and sends `userName`, not just `userId`
- [x] Fixed infinite loading spinner in ChatList when a user has zero conversations
- [x] Fixed conversation list not refreshing after messages are marked read (stale unread badge)
- [x] Separated `VITE_API_URL` (REST, includes `/api`) from `VITE_SOCKET_URL` (socket, no `/api` suffix) to prevent local/prod env collisions

### Tested & Verified (production)
- [x] Real-time message send/receive between two separate logged-in accounts (student + employer)
- [x] Correct message alignment and sender name display per user
- [x] Typing indicator appears/disappears correctly
- [x] Unread badge increments on new message, clears on open — verified both directions
- [x] "Message" button on EmployerApplicants creates a real conversation and routes to /messages

---

## 📊 Current Project Status

### Live Projects (4/4) 🎉
1. **HirePath v1 + v2** — https://hirepath-eight.vercel.app ✅
   - MERN job portal + real-time student–employer chat (Socket.io)
   - Backend: https://hirepath-api.onrender.com

2. **Portfolio Site** — https://portfolio-puce-six-nm8nojm82f.vercel.app ✅
   - Next.js + TypeScript showcase

3. **Chat App** — https://chat-app-seven-self-31.vercel.app ✅
   - Real-time Socket.io messaging
   - Backend: https://chat-app-backend-jued.onrender.com

4. **Dashboard App** — https://dashboard-gold-theta-32.vercel.app ✅
   - React + Redux + TypeScript
   - 25 passing tests

**5-Week Sprint Goal: ACHIEVED ✅ — 4 production projects, all live and tested.**

---

## 🎓 Skills Mastered

### Week 1-2
- React, Tailwind, React Router
- Node.js, Express, MongoDB
- JWT authentication
- Cloudinary file uploads
- Error boundaries & accessibility

### Week 2
- Next.js 15 file-based routing
- TypeScript interfaces & generics
- Form validation
- Component composition

### Week 3
- WebSocket protocol
- Socket.io architecture
- Real-time event-driven programming
- Message persistence

### Week 4
- Redux Toolkit (modern Redux)
- TypeScript + React integration
- Jest unit testing
- React Testing Library
- Test-driven development

### Week 5
- Socket.io integration into an existing production Express app
- JWT-authenticated WebSocket connections
- Real-world full-stack debugging: env var collisions, Mongoose ObjectId vs string pitfalls, response-shape mismatches, stale React state, Render deployment path issues
- Systematic bug isolation using Network tab, REST clients (Thunder Client / REST Client), and backend logs in tandem
- Designing REST + Socket.io hybrid architecture (REST for reliable initial load, sockets for real-time updates)

---

## 📋 Git Workflow
- Semantic commit messages (feat:, fix:, chore:, docs:, test:)
- Feature branches per week
- Professional git history
- 60+ commits across all projects

---

## 🎯 Post-Week 5 Plan
- [ ] Forgot Password functionality
- [ ] Employer Profile management page
- [ ] Manage Jobs page (edit/delete postings)
- [ ] Resume Upload page improvements
- [ ] Applicant Details page
- [ ] Employer Feedback page polish
- [ ] Build professional resume with 4 projects + links
- [ ] LinkedIn profile optimization
- [ ] GitHub profile showcase
- [ ] Internship applications (10-15 daily)
- [ ] Interview preparation
- [ ] Cover letter templates

---

## Notes
- **5-Week Sprint Goal:** 4 production projects + strong resume ✅ **COMPLETE**
- **Tech Focus:** Full-stack MERN + modern React patterns + real-time features
- **Quality:** Professional code + comprehensive testing + production-debugged
- **Deployment:** All projects live on production
- Always paste updated PROGRESS.md at start of new Claude session

---

## Contacts & Links
- **GitHub:** https://github.com/akramguroo-dev
- **Portfolio:** https://portfolio-puce-six-nm8nojm82f.vercel.app
- **Email:** akramguroo.dev@gmail.com