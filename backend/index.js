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
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS
app.use(cors());


// Connect to MongoDB
connectMongoDB(process.env.MONGO_URI);

// Routes
app.use("/", router);

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>URL Shortener API</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f9f9f9;
          color: #333;
        }

        .container {
          max-width: 800px;
          margin: 60px auto;
          background: #fff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #1d3557;
          font-size: 32px;
          margin-bottom: 20px;
        }

        p {
          font-size: 16px;
          line-height: 1.6;
        }

        code {
          background: #eee;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
        }

        .section {
          margin-top: 30px;
        }

        a {
          color: #0077cc;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        .footer {
          margin-top: 40px;
          font-size: 14px;
          color: #777;
          border-top: 1px solid #ddd;
          padding-top: 20px;
        }

        .highlight {
          color: #e63946;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Welcome to the URL Shortener API</h1>
        <p>This is a simple and powerful API that lets you shorten long URLs and redirect them with ease.</p>

        <div class="section">
          <h2>📘 How to Use</h2>
          <p>Send a <code>POST</code> request to <code>/shorten</code> with the following JSON body:</p>
          <pre>
{
  "originalUrl": "https://www.example.com"
}
          </pre>
          <p>You’ll receive a response with a shortened URL like:</p>
          <pre>
{
  "shortId": "abc123",
  "shortUrl": "https://yourdomain.com/abc123"
}
          </pre>
        </div>

        <div class="section">
          <h2>🔁 Redirection</h2>
          <p>Visiting <code>/abc123</code> will redirect the user to the original URL.</p>
        </div>

        <div class="section">
          <h2>🌐 API Routes</h2>
          <ul>
            <li><code>POST /shorten</code> – Shorten a URL</li>
            <li><code>GET /:shortId</code> – Redirect to original URL</li>
          </ul>
        </div>

        <div class="section footer">
          <p>🛠️ Built using <span class="highlight">Node.js</span>, <span class="highlight">Express</span>, and <span class="highlight">MongoDB</span>.</p>
          <p>Developed by <strong>Satendra Kumar Parteti</strong></p>
          <p>GitHub: <a href="https://github.com/satendra03" target="_blank">https://github.com/satendra03</a></p>
        </div>
      </div>
    </body>
    </html>
  `);
});


// Export the Express app as a handler for Vercel
// export default function handler(req, res) {
//   app(req, res);
// }

app.listen(PORT, () => {
  console.clear();
  console.log(`Server is running on port ${PORT}`);
});