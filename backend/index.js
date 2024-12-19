import express from "express";
import cors from 'cors'
import { router } from "./routes/url.js";
import { connectMongoDB } from "./connection.js";
import { configDotenv } from "dotenv";
import { logRequest } from "./middlewares/url.js";

// Load environment variables
configDotenv();

// Create express app instance and set port number
const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS
const allowedOrigins = ['https://short-n-share-by-satendra.vercel.app'];  // frontend URL
app.use(cors({
  origin: allowedOrigins,  // Only allow requests from this origin
  methods: ['GET', 'POST'],  // Allowed methods
  allowedHeaders: ['Content-Type'],  // Allowed headers
}));
// app.use(cors());

// Connect to MongoDB
connectMongoDB(process.env.MONGO_URI);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Log requests
// app.use(logRequest('log.txt'));

// Routes
app.use("/url", router);

app.listen(PORT, "0.0.0.0", () => {
  console.clear();
  console.log(`Server is running on port ${PORT}`);
});