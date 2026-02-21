import express from "express";
import cors from "cors";
import { router } from "./routes/url.js";
import { initializeFirebase } from "./connection.js";
import { configDotenv } from "dotenv";

// Load environment variables
configDotenv();

// Create express app
const app = express();
const PORT = process.env.PORT || 8000;

/* =======================
   ✅ CORS SETUP
   ======================= */
const corsOptions = {
  origin: [
    "https://short-n-share.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS with options to ALL routes (including preflight OPTIONS)
app.use(cors(corsOptions));

// Explicitly handle preflight for all routes with the SAME options
app.options("*", cors(corsOptions));

/* =======================
   MIDDLEWARES
   ======================= */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* =======================
   DATABASE
   ======================= */
initializeFirebase();

/* =======================
   HEALTH CHECK (keeps Render instance alive)
   ======================= */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

/* =======================
   ROUTES
   ======================= */
app.use("/", router);

/* =======================
   SERVER
   ======================= */
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
