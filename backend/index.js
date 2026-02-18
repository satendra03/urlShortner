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
app.use(cors({
  origin: "https://short-n-share.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
// HANDLE PREFLIGHT REQUESTS
app.options("*", cors());

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
