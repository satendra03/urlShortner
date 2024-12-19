import { useState } from "react";
import "./App.css";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Link } from "lucide-react";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
    <div>
      <h1
        className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      >URL Shortener</h1>
      <form onSubmit={handleSubmit} className="my-10">
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          required
        />
        <Button className="my-5" type="submit">Shorten URL</Button>
      </form>
      {shortUrl && (
        <div className="border h-36 flex items-center justify-center flex-col rounded-md">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" >Short URL:</h2>
          <div className="link flex items-center justify-center">
          <Link />
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
             {shortUrl}
          </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
