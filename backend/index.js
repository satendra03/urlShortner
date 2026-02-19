import express from "express";
import cors from 'cors'
import { router } from "./routes/url.js";
import { connectMongoDB } from "./connection.js";
import { configDotenv } from "dotenv";

// Load environment variables
configDotenv();

// Create express app instance and set port number
const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS
// app.use(cors({
//   origin: "https://short-n-share.vercel.app",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));
// // HANDLE PREFLIGHT REQUESTS
// app.options("*", cors());

/* ---------- FORCE CORS HEADERS ---------- */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://short-n-share.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // ⬅️ CRITICAL
  }
  next();
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
connectMongoDB(process.env.MONGO_URI);

// Routes
app.use("/", router);

app.listen(PORT, () => {
  console.clear();
  console.log(`Server is running on port ${PORT}`);
});
