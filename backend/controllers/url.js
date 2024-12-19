import { nanoid } from "nanoid";
import URL from "../models/url.js";

// Generate short URL
export const generateShortUrl = async (req, res) => {
  const body = req.body;
  if (!body || !body.redirectUrl)
    return res
      .status(400)
      .json({ message: "Invalid request, missing redirectUrl" });

  const shortId = nanoid(8);
  const { redirectUrl } = req.body;
  const baseUrl = `http://localhost:${process.env.PORT}`;
  await URL.create({
    shortId: shortId,
    redirectUrl: redirectUrl,
    visitHistory: [],
  });

  return res.status(201).json({
    message: "Short URL generated successfully",
    shortId: shortId,
    shortUrl: `${baseUrl}/url/${shortId}`,
    redirectUrl: redirectUrl,
  });
};

// Redirect to original URL
export const redirectToOriginalUrl = async (req, res) => {
  const { shortId } = req.params;
  const url = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
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
  if (!url) return res.status(404).json({ message: "URL not found" });
  return res.status(200).json({
    visitHistory: url.visitHistory,
    clickCount: url.visitHistory.length,
  });
};
