import { nanoid } from "nanoid";
import {
  findByRedirectUrl,
  findByShortId,
  createUrl,
  updateUrl,
} from "../models/url.js";

const PORT = process.env.PORT || 8000;

// Generate short URL
export const generateShortUrl = async (req, res) => {
  try {
    const body = req.body;
    if (!body || !body.redirectUrl)
      return res
        .status(400)
        .json({ message: "Invalid request, missing redirectUrl" });

    const { redirectUrl } = req.body;

    // Check if URL already exists
    const urlExists = await findByRedirectUrl(redirectUrl);
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
    const baseUrl = `${process.env.BASE_URL || `http://localhost:${PORT}`}`;
    const shortUrl = `${baseUrl}/${shortId}`;

    // Save the short URL to Firestore
    await createUrl({
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
  } catch (error) {
    console.error("Error generating short URL:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Redirect to original URL
export const redirectToOriginalUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await findByShortId(shortId);

    if (!url) return res.status(404).json({ message: "URL not found" });

    // Add visit history
    const updatedVisitHistory = [
      ...(url.visitHistory || []),
      { timestamp: Date.now() },
    ];

    await updateUrl(shortId, {
      visitHistory: updatedVisitHistory,
    });

    res.redirect(url.redirectUrl);
  } catch (error) {
    console.error("Error redirecting:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Analyze URL visit history
export const analyzeUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await findByShortId(shortId);

    if (!url) return res.status(404).json({ message: "ID not found" });

    return res.status(200).json({
      visitHistory: url.visitHistory || [],
      clickCount: (url.visitHistory || []).length,
    });
  } catch (error) {
    console.error("Error analyzing URL:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
