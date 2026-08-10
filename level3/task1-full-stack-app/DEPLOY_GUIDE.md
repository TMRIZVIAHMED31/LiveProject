# Task 1 — Deploying the MERN App (Full-Stack Application)

You already have the full MERN stack from Level 2:
- Backend: `level2/backend` (Express + MongoDB/Mongoose + JWT auth)
- Frontend: `level2/frontend-react` (React)

This guide covers turning that into a **deployed, production-ready** app.

## 1. Performance / production hardening (backend)

Install a couple of extra middlewares in `level2/backend`:
```bash
cd level2/backend
npm install helmet compression morgan
```

Add to the top of `server.js` (after the existing `require`s):
```js
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
```

And register them before your routes:
```js
app.use(helmet());          // sets safe HTTP headers
app.use(compression());     // gzips responses
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));   // request logging in dev only
}
```

Mongoose performance:
- Indexes are already set (`User.email` unique index, `Product.owner` compound index).
- For larger datasets, add pagination to `GET /api/products` using `.skip()` / `.limit()`.

## 2. Environment variables for production

In your hosting provider's dashboard (not committed to Git), set:
```
MONGO_URI=<your Atlas connection string>
JWT_SECRET=<long random string>
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=5000
```

## 3. Deploy the backend (Render example — free tier works)

1. Push `level2/backend` to a GitHub repo (or a subfolder of your monorepo).
2. Go to https://render.com → New → Web Service → connect your repo.
3. Root directory: `level2/backend` (if monorepo).
4. Build command: `npm install`
5. Start command: `npm start`
6. Add the environment variables from step 2.
7. Deploy — note the public URL, e.g. `https://codveda-api.onrender.com`.

*(Railway, Fly.io, or a VPS work the same way — install deps, set env vars, run `npm start`.)*

## 4. Deploy the frontend (Vercel example)

1. In `level2/frontend-react/src/api/axios.js`, change the `baseURL` to your deployed
   backend URL:
   ```js
   const api = axios.create({
     baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
   });
   ```
2. Add a `.env.production` in `level2/frontend-react`:
   ```
   REACT_APP_API_URL=https://codveda-api.onrender.com/api
   ```
3. Push `level2/frontend-react` to GitHub.
4. Go to https://vercel.com → New Project → import the repo → root directory
   `level2/frontend-react` → deploy.
5. On the backend, allow CORS from your deployed frontend origin instead of `*`:
   ```js
   app.use(cors({ origin: "https://your-frontend.vercel.app" }));
   ```

## 5. Role-based access recap (already implemented)

- `middleware/authMiddleware.js` → `protect` (must be logged in) and
  `authorize("admin")` (must have a specific role) are already wired into
  `routes/productRoutes.js`.
- Extend the same pattern to any new route you add.

Once deployed, this satisfies Task 1's objectives: fully integrated web app,
auth + role-based access, both tiers deployed, and basic performance optimization.
