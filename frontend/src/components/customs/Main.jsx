import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// Use Vercel env var, or fall back to the deployed Render backend URL
const API_URL =
  import.meta.env.VITE_BASE_URL || "https://urlshortner-fozw.onrender.com";

function Main() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ redirectUrl: url }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setShortUrl(data.shortUrl);
        toast.success("Short URL generated!");
      } else if (response.status === 409) {
        toast("This URL has already been shortened.", { icon: "⚠️" });
        setShortUrl(data.shortUrl);
      } else {
        toast.error(data.message || "Failed to shorten URL");
        console.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error(
        "Could not reach the server. It may be waking up — please try again in a few seconds.",
      );
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Short URL copied to clipboard!");
      setTimeout(() => {
        window.open(shortUrl, "_blank", "noopener,noreferrer");
      }, 1000);
    } catch (error) {
      toast.error("Failed to copy URL");
      console.error(error);
    }
  };

  return (
    <div className="w-full mt-5">
      <p>Enter a URL below to generate a short URL.</p>
      <form onSubmit={handleSubmit} className="my-5 p-3">
        <Input
          type="url"
          className="text-center"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          required
        />
        <Button
          type="submit"
          className="my-5 transition-all hover:shadow-md hover:scale-105 active:scale-95"
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </Button>
      </form>
      {shortUrl && (
        <div className="flex items-center justify-center flex-col rounded-md">
          <h2 className="scroll-m-20 text-md border-b pb-2 md:text-3xl font-semibold tracking-tight first:mt-0">
            Short URL:
          </h2>
          <div className="link flex flex-col items-center gap-2 justify-center">
            {shortUrl}
            <Button
              className="transition-all hover:scale-105 active:scale-95"
              onClick={handleCopy}
            >
              Copy and Visit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
