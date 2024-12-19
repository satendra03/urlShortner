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
const PORT = process.env.PORT;

// Enable CORS
// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Connect to MongoDB
connectMongoDB(process.env.MONGO_URI);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Log requests
app.use(logRequest('log.txt'));

// Routes
app.use("/url", router);

app.listen(PORT, "0.0.0.0", () => {
  console.clear();
  console.log(`Server is running on port ${PORT}`);
});
