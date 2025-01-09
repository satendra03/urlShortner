import { nanoid } from "nanoid";
import URL from "../models/url.js";

// Generate short URL
export const generateShortUrl = async (req, res) => {
  const body = req.body;
  if (!body || !body.redirectUrl)
    return res
      .status(400)
      .json({ message: "Invalid request, missing redirectUrl" });

  const { redirectUrl } = req.body;

  // Check if URL already exists
  const urlExists = await URL.findOne({ redirectUrl: redirectUrl });
  if (urlExists) {
    // Return existing short URL if it exists
    return res.status(409).json({
      message: "URL already exists",
      shortId: urlExists.shortId,
      shortUrl: urlExists.shortUrl,
    });
  }
  // Generate new short URL and save it to the database
  const shortId = nanoid(8);
  const baseUrl = `${process.env.BASE_URL}`;  
  
  const shortUrl = `${baseUrl}/url/${shortId}`;
  // Save the short URL to the database
  await URL.create({
    shortId: shortId,
    redirectUrl: redirectUrl,
    shortUrl: shortUrl,
    visitHistory: [],
  });
  // Return the short URL to the user
  return res.status(201).json({
    message: "Short URL generated successfully",
    shortId: shortId,
    shortUrl: shortUrl,
    redirectUrl: redirectUrl,
  });
};

// Redirect to original URL
export const redirectToOriginalUrl = async (req, res) => {
  const { shortId } = req.params;
  const url = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
      // Push the current timestamp to the visit history array
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!url) return res.status(404).json({ message: "URL not found" });
  res.redirect(url.redirectUrl);
};

// Analyze URL visit history
export const analyzeUrl = async (req, res) => {
  const { shortId } = req.params;
  const url = await URL.findOne({ shortId: shortId });
  if (!url) return res.status(404).json({ message: "ID not found" });
  return res.status(200).json({
    visitHistory: url.visitHistory,
    clickCount: url.visitHistory.length,
  });
};
