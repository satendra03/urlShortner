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
   ✅ PROPER CORS SETUP
   ======================= */
app.use(
  cors({
    origin: ["https://short-n-share.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

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
   ROUTES
   ======================= */
app.use("/", router);

/* =======================
   SERVER
   ======================= */
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
