# Level 3 (Advanced) — Guide

Level 3 builds on the Level 1/2 backend (Express + MongoDB + JWT auth). You only need
**2 of the 3 tasks**, but all three are included here.

```
level3/
├── task1-full-stack-app/     # MERN — reuses level2 backend + frontend, adds deploy config
│   └── DEPLOY_GUIDE.md
├── task2-websockets/         # Socket.io real-time chat/notifications
│   ├── backend/
│   └── frontend/
└── task3-graphql-api/        # GraphQL API with Apollo Server
    └── backend/
```

---

## Task 1: Build a Full-Stack Application (MERN)

Your MERN stack is already built:
- **M**ongoDB + Mongoose → `level2/backend/models`
- **E**xpress → `level2/backend/server.js`
- **R**eact → `level2/frontend-react`
- **N**ode.js → runtime for all of the above

`task1-full-stack-app/DEPLOY_GUIDE.md` walks through deploying that exact app
(backend to Render/Railway, frontend to Vercel/Netlify) plus performance
optimizations (compression, helmet, indexes — already partly done in Level 2).

## Task 2: WebSockets for Real-Time Communication

`task2-websockets/backend` adds a Socket.io server (JWT-authenticated handshake,
per-user rooms, persisted chat messages in MongoDB) on top of the same
Express app. `task2-websockets/frontend` is a minimal HTML/JS chat client.

```bash
cd level3/task2-websockets/backend
npm install
cp .env.example .env   # set MONGO_URI + JWT_SECRET (same secret as level2 if you want to reuse tokens)
npm run dev
```
Then open `level3/task2-websockets/frontend/index.html` in two different browser tabs
(logged in as two different users) to see real-time messaging.

## Task 3: GraphQL API Development

`task3-graphql-api/backend` exposes the same User/Product data through GraphQL
using Apollo Server, with queries, mutations, and JWT-based auth in the resolver context.

```bash
cd level3/task3-graphql-api/backend
npm install
cp .env.example .env
npm run dev
```
Open **http://localhost:5000/graphql** — Apollo Sandbox opens in the browser.
Example queries/mutations are in `task3-graphql-api/backend/EXAMPLE_QUERIES.md`.
