import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function Main() {
  // The main/redirect URl
  const [url, setUrl] = useState("");

  // The short URL
  const [shortUrl, setShortUrl] = useState("");

  // Function to handle form submission and generate a short URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the server to generate a short URL
      // Adjust the fetch url accordingly
      const response = await fetch("http://localhost:8000/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ redirectUrl: url }),
      });
      const data = await response.json();
      if (response.ok) {
        setShortUrl(data.shortUrl);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
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
        >
          Shorten URL
        </Button>
      </form>
      {shortUrl && (
        <div className=" flex items-center justify-center flex-col rounded-md">
          <h2 className="scroll-m-20 text-md border-b pb-2 md:text-3xl font-semibold tracking-tight first:mt-0">
            Short URL:
          </h2>
          <div className="link flex items-center border-b-2 justify-center">
            <a
              href={shortUrl}
              className="text-sm md:text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
