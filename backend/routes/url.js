import express from "express";
import {
  analyzeUrl,
  generateShortUrl,
  redirectToOriginalUrl,
} from "../controllers/url.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "index.html"));
});

router.post("/shorten", generateShortUrl);

// ⚠️ IMPORTANT: /analyze/:shortId MUST come before /:shortId
// otherwise Express matches /analyze/xxx as a redirect shortId
router.get("/analyze/:shortId", analyzeUrl);

router.get("/:shortId", redirectToOriginalUrl);
