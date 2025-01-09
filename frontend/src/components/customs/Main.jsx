import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Main() {
  // The URL entered by the user
  const [url, setUrl] = useState("");

  // The generated short URL
  const [shortUrl, setShortUrl] = useState("");

  // Loading state to show a spinner during the request
  const [loading, setLoading] = useState(false);

  // Function to handle form submission and generate a short URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const apiUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/'; // API URL for shortening URLs
      console.log("API URL:", apiUrl);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ redirectUrl: url }), // Send user input URL
      });
      const data = await response.json();
      setLoading(false); // Stop loading
      console.log("Data", data); //

      if (response.ok) {
        setShortUrl(data.shortUrl); // Set the shortened URL
      } else if (response.status === 409) {
        toast("This URL has already been shortened.", {
          icon: "⚠️",
        }); // Alert user if URL has already been shortened
        setShortUrl(data.shortUrl); // Set the shortened URL
      } else {
        console.error(data.message); // Handle errors from backend
      }
    } catch (error) {
      setLoading(false); // Stop loading on error
      console.error("Error:", error);
    }
  };

  // Function to copy the shortened URL to the clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Short URL copied to clipboard!");
      setTimeout(() => {
        window.open(shortUrl, "_blank", "noopener,noreferrer");
      }, 1000);
    } catch (error) {
      toast.error("Failed to copy URL:", error);
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
          disabled={loading} // Disable button while loading
        >
          {loading ? "Shortening..." : "Shorten URL"} {/* Loading text */}
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
