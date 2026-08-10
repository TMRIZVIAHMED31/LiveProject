# SETUP_GUIDE.md — Full Walkthrough (Level 1, 2 & 3)

This is the one guide to follow start-to-finish for the whole `codveda-fullstack` package.
`level1/GUIDE.md`, `level2/GUIDE.md` and `level3/GUIDE.md` still exist for quick reference,
but this file covers everything in order, including prerequisites, running order, testing,
Git/GitHub, and the Codveda submission requirements.

**Remember:** you only need to complete **2 of the 3 tasks per level**. Do Level 1 and
Level 2 fully first (Level 3 builds on the same patterns), then pick 2 of the 3 Level 3
tasks based on what interests you most or what you have time for.

---

## 0. Prerequisites (install once)

| Tool | Check install | Download |
|---|---|---|
| Node.js (LTS) + npm | `node -v` / `npm -v` | https://nodejs.org |
| Git | `git -v` | https://git-scm.com |
| VS Code (recommended editor) | — | https://code.visualstudio.com |
| MongoDB | see below | — |
| Postman or Thunder Client (VS Code extension) | — | for testing the API |

**MongoDB — pick ONE:**
- **Option A — MongoDB Atlas (recommended, zero local install):**
  1. Create a free account/cluster at https://www.mongodb.com/cloud/atlas
  2. Database Access → add a database user (username + password)
  3. Network Access → Add IP Address → "Allow access from anywhere" (0.0.0.0/0) for development
  4. Database → Connect → "Drivers" → copy the connection string, it looks like:
     `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`
  5. Append a database name at the end, e.g. `.../codveda_level1?retryWrites=true&w=majority`
- **Option B — Local MongoDB:**
  1. Install MongoDB Community Server: https://www.mongodb.com/try/download/community
  2. Start it: `mongod` (default URI is `mongodb://127.0.0.1:27017`)

Keep whichever connection string you chose — you'll paste it into `.env` files below.

---

## 1. Unzip and open the project

```bash
unzip codveda-fullstack-level1-2.zip
cd codveda-fullstack
code .        # opens in VS Code
```

Folder layout:
```
codveda-fullstack/
├── level1/
│   ├── backend/        (Express + MongoDB REST API)
│   └── frontend/        (HTML/CSS/vanilla JS)
└── level2/
    ├── backend/         (adds JWT auth + relationships)
    └── frontend-react/  (React app)
```

---

## 2. Level 1 setup (do this first)

### 2.1 Backend
```bash
cd level1/backend
npm install
cp .env.example .env
```
Open `.env` and set your MongoDB connection string:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/codveda_level1
```
Start the server:
```bash
npm run dev
```
You should see:
```
MongoDB connected: ...
Server running on http://localhost:5000
```

**Test it** (in Postman/Thunder Client or `curl`):
```bash
curl http://localhost:5000/api/products
# should return {"success":true,"count":0,"data":[]}

curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Wireless Mouse","price":19.99,"stock":50}'
```

### 2.2 Frontend
Leave the backend running in its terminal, open a **new terminal**:
```bash
cd level1/frontend
npx serve .
```
Open the URL it prints (usually `http://localhost:3000`) — or just double-click `index.html`.
Add/edit/delete a product from the form to confirm it's talking to your MongoDB-backed API.

✅ Level 1 Tasks 1–3 are now all working.

---

## 3. Level 2 setup

### 3.1 Backend
```bash
cd level2/backend
npm install
cp .env.example .env
```
Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/codveda_level2
JWT_SECRET=make_this_a_long_random_string
JWT_EXPIRES_IN=7d
```
> Use a **different database name** (`codveda_level2`) than Level 1 so the data doesn't mix.
> Also stop the Level 1 backend first if it's still using port 5000.

Start it:
```bash
npm run dev
```

**Test auth:**
```bash
curl.exe -X POST http://localhost:5000/api/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Jane Doe\",\"email\":\"jane@example.com\",\"password\":\"pass123\"}"
# copy the "token" value from the response

curl.exe http://localhost:5000/api/auth/me ^
  -H "Authorization: Bearer <paste token here>"
```

**Test protected product creation:**
```bash
curl.exe -X POST http://localhost:5000/api/products ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer <token>" ^
  -d "{\"name\":\"Keyboard\",\"price\":49.99,\"stock\":20}"
```

### 3.2 Frontend (React)
New terminal:
```bash
cd level2/frontend-react
npm install
npm start
```
Opens automatically at `http://localhost:3000`. Sign up, log in, then add/edit/delete
products — the JWT is attached automatically to every request (see `src/api/axios.js`).

✅ Level 2 Tasks 1–3 are now all working.

---

## 4. Level 3 setup (Advanced — pick any 2 of the 3)

Each Level 3 task is **self-contained** with its own `package.json` and `.env`, so you
can set them up independently and in any order. Stop any Level 1/2 backend still running
on port 5000 before starting one of these (or change `PORT` in its `.env`).

### 4.1 Task 1 — Full-Stack App (MERN) — no new code to run locally
This task reuses your working **Level 1 + Level 2** app (Express + MongoDB + React) and
is about making it deployable. Open `level3/task1-full-stack-app/DEPLOY_GUIDE.md` and
follow it end-to-end:
1. Add `helmet` / `compression` to `level2/backend`
2. Set production env vars on your host
3. Deploy the backend (Render/Railway example given)
4. Point the React app's `axios` baseURL at the deployed backend and deploy it (Vercel example given)

### 4.2 Task 2 — WebSockets (real-time chat)
```bash
cd level3/task2-websockets/backend
npm install
cp .env.example .env
```
Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/codveda_level3_chat
JWT_SECRET=make_this_a_long_random_string
```
Start it:
```bash
npm run dev
# "HTTP + WebSocket server running on http://localhost:5000"
```
Open the frontend:
```bash
cd level3/task2-websockets/frontend
npx serve .
```
Open the printed URL **in two separate browser tabs** (or one normal + one incognito),
sign up as two different users, and chat between them in real time — messages persist
to MongoDB and reload as history when you reconnect.

### 4.3 Task 3 — GraphQL API
```bash
cd level3/task3-graphql-api/backend
npm install
cp .env.example .env
```
Edit `.env` (same pattern — its own `MONGO_URI`/`JWT_SECRET`):
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/codveda_level3_graphql
JWT_SECRET=make_this_a_long_random_string
```
Start it:
```bash
npm run dev
# "GraphQL server ready at http://localhost:5000/graphql"
```
Open **http://localhost:5000/graphql** in a browser — this opens **Apollo Sandbox**.
Follow `level3/task3-graphql-api/backend/EXAMPLE_QUERIES.md` in order: signup → paste
the token into the Sandbox's "Headers" panel as `{"Authorization": "Bearer <token>"}` →
run the `me`, `createProduct`, `products`, `updateProduct`, `deleteProduct` operations.

---

## 5. Common issues

| Problem | Fix |
|---|---|
| `MongoServerError: bad auth` | Wrong username/password in `MONGO_URI` — re-copy from Atlas |
| `EADDRINUSE: port 5000` | Another server (Level 1 or Level 2 backend) is already running — stop it first |
| React can't reach API / CORS error | Make sure the backend is running on port 5000 and `cors()` is enabled in `server.js` (it already is) |
| `MongooseServerSelectionError` | Atlas IP allowlist doesn't include your current IP — add `0.0.0.0/0` while developing |
| 401 on product create/update/delete | You're not logged in, or didn't paste the token correctly in `Authorization: Bearer <token>` |
| Socket.io: `Authentication error: no token` | Frontend didn't pass `auth: { token }` when calling `io(...)` — check `script.js` sets it after login |
| Socket.io: connects then immediately disconnects | JWT_SECRET in the WebSocket backend's `.env` doesn't match the token you're sending (make sure you signed up/logged in against *that same* backend) |
| GraphQL: "Not authenticated" on `createProduct` | You forgot to add the `Authorization` header in Apollo Sandbox's Headers panel, or the token expired |
| GraphQL Sandbox doesn't load | Make sure you're hitting `/graphql` (not `/`) and the server logged "GraphQL server ready" |
| Two Level 3 backends both trying to use port 5000 | Only run one at a time, or change `PORT` in one `.env` (e.g. `5001`) and update the frontend's URL to match |

---

## 6. Git & GitHub (do this alongside development, not just at the end)

```bash
git init
git add .
git commit -m "Level 1 & Level 2: REST API, MongoDB, JWT auth, React frontend"
git remote add origin <your-empty-github-repo-url>
git branch -M main
git push -u origin main
```
Add a `.gitignore` in each backend/frontend folder so `node_modules` and `.env` aren't committed:
```
node_modules/
.env
```

---

## 7. Submission checklist (per Codveda instructions)

- [ ] Complete **any 2 of the 3 tasks per level** (this project includes all 3 for each level, pick your best two per level if time is short)
- [ ] Push code to a public GitHub repo, keep a **separate file/folder per level** (already done — `level1/`, `level2/`, `level3/`)
- [ ] Record a short video walking through what you built
- [ ] Post on LinkedIn: tag **@Codveda**, include the video + GitHub repo link, and use hashtags `#CodvedaJourney #CodvedaExperience #FutureWithCodveda #CodvedaAchievements #CodvedaProjects`
- [ ] Submit via the Codveda submission form once it's shared
