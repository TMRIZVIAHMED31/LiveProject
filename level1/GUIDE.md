# Level 1 (Basic) — Guide

## Task 1: Setup Development Environment (uses MongoDB)

1. **Install Node.js & npm**
   - Download from https://nodejs.org (LTS version)
   - Verify: `node -v` and `npm -v`
2. **Install a code editor** — VS Code: https://code.visualstudio.com
3. **Install Git & set up GitHub**
   ```bash
   git --version
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
4. **Install MongoDB** — pick ONE:
   - **Local install:** https://www.mongodb.com/try/download/community, then run `mongod` to start the local server (default URI `mongodb://127.0.0.1:27017`).
   - **MongoDB Atlas (recommended, free, no local install):** create a free cluster at https://www.mongodb.com/cloud/atlas, create a DB user, allow your IP, and copy the connection string (looks like `mongodb+srv://user:pass@cluster.mongodb.net/dbname`).
5. **Learn basic terminal commands:** `cd`, `ls`/`dir`, `mkdir`, `npm init`, `npm install`, `npm run dev`.

## Task 2: Build a Simple REST API (Node.js + Express + MongoDB)

```bash
cd level1/backend
npm install
cp .env.example .env
# edit .env and paste your MongoDB URI
npm run dev
```

Server runs at `http://localhost:5000`. Endpoints (CRUD on **products**):

| Method | Route | Description |
|---|---|---|
| GET | /api/products | list all products |
| GET | /api/products/:id | get one product |
| POST | /api/products | create a product |
| PUT | /api/products/:id | update a product |
| DELETE | /api/products/:id | delete a product |

Test with Postman/Thunder Client, e.g.:
```json
POST /api/products
{
  "name": "Wireless Mouse",
  "price": 19.99,
  "stock": 50
}
```

## Task 3: Frontend with HTML, CSS, and JavaScript

```bash
cd level1/frontend
# just open index.html in a browser, or serve it:
npx serve .
```

Make sure the backend (Task 2) is running on `http://localhost:5000` — `script.js` fetches from it and renders products dynamically, with add/edit/delete forms wired to the API.
