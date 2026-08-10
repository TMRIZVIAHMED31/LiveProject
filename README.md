<<<<<<< HEAD
# Codveda Full-Stack Internship — Level 1, 2 & 3 Guideline
=======
# Codveda Full-Stack Internship — Level 1 & Level 2 Guideline
>>>>>>> ada299dd797f3eec7e4e5832a656f5ec07f6cf90

This package contains a working project structure and starter code for:

- **Level 1 (Basic)** — Dev environment, REST API, vanilla JS frontend
- **Level 2 (Intermediate)** — React frontend, JWT auth, MongoDB integration
<<<<<<< HEAD
- **Level 3 (Advanced)** — Deployable MERN app, real-time chat with Socket.io, GraphQL API

See `SETUP_GUIDE.md` for the full walkthrough. `level3/GUIDE.md` covers Level 3 specifically.
=======
>>>>>>> ada299dd797f3eec7e4e5832a656f5ec07f6cf90

> Reminder: per the task list, you only need to complete **2 of the 3 tasks per level**.
> This project happens to cover all of them so you can pick whichever two fit your time best.

---

## Overall Folder Structure

```
codveda-fullstack/
├── level1/
│   ├── GUIDE.md              # step-by-step setup + how to run
│   ├── backend/               # Express + MongoDB REST API
│   │   ├── config/db.js
│   │   ├── models/Product.js
│   │   ├── controllers/productController.js
│   │   ├── routes/productRoutes.js
│   │   ├── server.js
│   │   ├── package.json
│   │   └── .env.example
│   └── frontend/              # HTML/CSS/vanilla JS
│       ├── index.html
│       ├── style.css
│       └── script.js
│
└── level2/
    ├── GUIDE.md
    ├── backend/                # extends level1 backend: auth + relations
    │   ├── config/db.js
    │   ├── models/User.js
    │   ├── models/Product.js
    │   ├── middleware/authMiddleware.js
    │   ├── controllers/authController.js
    │   ├── controllers/productController.js
    │   ├── routes/authRoutes.js
    │   ├── routes/productRoutes.js
    │   ├── server.js
    │   ├── package.json
    │   └── .env.example
    └── frontend-react/         # React SPA consuming the same API
        ├── public/index.html
        ├── src/
        │   ├── api/axios.js
        │   ├── context/AuthContext.js
        │   ├── components/Login.js
        │   ├── components/Signup.js
        │   ├── components/ProductList.js
        │   ├── components/ProductForm.js
        │   ├── App.js
        │   ├── App.css
        │   └── index.js
        └── package.json
```

## Tech Stack Used

| Layer | Choice |
|---|---|
| Runtime | Node.js + npm |
| Backend framework | Express.js |
| Database | **MongoDB** (via Mongoose ODM) — as required for Level 1 Task 1 |
| Auth | bcrypt (hashing) + JSON Web Tokens |
| Level 1 Frontend | HTML5, CSS3, vanilla JavaScript (Fetch API) |
| Level 2 Frontend | React (functional components + hooks) + Axios |
| Version control | Git / GitHub |

## Recommended Order of Work

1. **Level 1 → Task 1 (Setup):** install Node.js, npm, Git, MongoDB (or use MongoDB Atlas free tier). See `level1/GUIDE.md`.
2. **Level 1 → Task 2 (REST API):** run `level1/backend` — CRUD API for a `Product` resource backed by MongoDB.
3. **Level 1 → Task 3 (Frontend):** open `level1/frontend/index.html` — talks to the Task 2 API.
4. **Level 2 → Task 3 (DB Integration):** already MongoDB/Mongoose in Level 1 — Level 2 backend extends it with a `User` model, relationships (`Product.owner → User`), indexes, and validation.
5. **Level 2 → Task 2 (Auth):** signup/login endpoints with bcrypt + JWT, protected routes, role-based access.
6. **Level 2 → Task 1 (React Frontend):** `level2/frontend-react` recreates the Level 1 frontend as reusable React components, now with login/signup and protected product management.

Each level's `GUIDE.md` has exact terminal commands to install dependencies and run the servers.
