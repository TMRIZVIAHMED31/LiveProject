require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");


connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());

const cors = require("cors");

app.use(cors({
  origin: "https://live-project-git-main-rizvi5.vercel.app",
  credentials: true,
}));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use((err, req, res, next) => {
  if (err && (err.type === "entity.parse.failed" || err instanceof SyntaxError)) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON body",
    });
  }

  next(err);
});

app.get("/", (req, res) => {
  res.send("Codveda Level 2 API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
