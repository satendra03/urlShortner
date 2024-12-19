import mongoose from "mongoose";

// Create a new schema for our url data
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

export default URL = mongoose.model("Url", urlSchema);
