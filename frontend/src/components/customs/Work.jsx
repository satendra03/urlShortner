import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const Work = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [click, setClick] = useState(0);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend to shorten URL
      const response = await fetch(`http://localhost:8000/url/analyze/${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (response.ok) {
        setData(res.visitHistory);
        setClick(res.clickCount);
      } else {
        console.error(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full mt-5">
      <p>Enter ID to get the data.</p>
      <form onSubmit={handleSubmit} className="my-5 p-3">
        <Input
          type="text"
          className="text-center"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter ID"
          required
        />
        <Button
          type="submit"
          className="my-5 transition-all hover:shadow-md hover:scale-105 active:scale-95"
        >
          Get Data
        </Button>
      </form>
      {data && (
        <div className="flex items-center justify-center flex-col rounded-md">
          <h3 className="text-xl font-semibold my-3">Total Visits: {click}</h3>
          <ScrollArea className="max-h-[350px] w-[350px] hidden custom-375:block rounded-md border p-4">
            <ol>
              {data.map((item, index) => {
                return (
                  <li key={index} className="my-1">
                    <p className="text-sm">
                      <span className="font-semibold">Visited at:</span>{" "}
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </li>
                );
              })}
            </ol>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default Work;
