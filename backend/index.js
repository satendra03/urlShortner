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
app.use(cors(
  { 
    origin: process.env.BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
));


// Connect to MongoDB
connectMongoDB(process.env.MONGO_URI);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/url", router);

// Export the Express app as a handler for Vercel
export default function handler(req, res) {
  app(req, res);
}

app.listen(PORT, "0.0.0.0", () => {
  console.clear();
  console.log(`Server is running on port ${PORT}`);
});