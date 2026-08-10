# Level 2 (Intermediate) — Guide

This backend **extends the Level 1 API**: same `Product` resource, plus a `User` model,
JWT authentication, and ownership relationships — covering Task 2 and Task 3.
The React app covers Task 1.

## Task 3: Database Integration (MongoDB + Mongoose)

Already using MongoDB via Mongoose from Level 1. In Level 2 we add:
- A `User` model (`level2/backend/models/User.js`) with a hashed password.
- A relationship: every `Product.owner` references a `User._id`.
- Schema validation (`required`, `min`, `enum` for roles).
- An index on `User.email` (`unique: true`) for fast lookups and to prevent duplicate signups.

## Task 2: Authentication and Authorization

```bash
cd level2/backend
npm install
cp .env.example .env
# edit .env: MONGO_URI + a strong JWT_SECRET
npm run dev
```

Auth endpoints:

| Method | Route | Description |
|---|---|---|
| POST | /api/auth/signup | register (name, email, password, role) |
| POST | /api/auth/login | returns a JWT |
| GET | /api/auth/me | returns current user (requires token) |

- Passwords are hashed with **bcrypt** before saving (`models/User.js` pre-save hook).
- On login, a **JWT** is issued (`middleware/authMiddleware.js` verifies it on protected routes).
- The frontend stores the token and sends it as `Authorization: Bearer <token>`.
- `POST/PUT/DELETE /api/products` now require a valid token; `admin`-only actions are gated with `authorize("admin")`.

## Task 1: Frontend with a JavaScript Framework (React)

```bash
cd level2/frontend-react
npm install
npm start
```

Runs at `http://localhost:3000` and expects the backend at `http://localhost:5000`
(see `src/api/axios.js` for the base URL). Includes:
- `AuthContext` for global auth state + token persistence
- `Login.js` / `Signup.js` components
- `ProductList.js` / `ProductForm.js` — reusable components for CRUD, calling the protected API with the JWT attached automatically via an Axios interceptor.
