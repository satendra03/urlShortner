import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import toast from "react-hot-toast";

// Use Vercel env var, or fall back to the deployed Render backend URL
const API_URL =
  import.meta.env.VITE_BASE_URL || "https://urlshortner-fozw.onrender.com";

const Work = () => {
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [click, setClick] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/analyze/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      setLoading(false);

      if (response.ok) {
        setData(res.visitHistory);
        setClick(res.clickCount);
      } else {
        console.error(res.message);
        toast.error(res.message || "ID not found");
        setClick(0);
        setData([]);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error(
        "Could not reach the server. It may be waking up — please try again in a few seconds.",
      );
      setClick(0);
      setData([]);
    }
  };

  return (
    <div className="w-full mt-5">
      <p>Enter ID to get the data.</p>
      <form onSubmit={handleSubmit} className="my-5 p-3">
        <Input
          type="text"
          className="text-center"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter ID"
          required
        />
        <Button
          type="submit"
          className="my-5 transition-all hover:shadow-md hover:scale-105 active:scale-95"
          disabled={loading}
        >
          {loading ? "Fetching Data..." : "Fetch Data"}
        </Button>
      </form>
      {data && (
        <div className="flex items-center justify-center flex-col rounded-md">
          <h3 className="text-xl font-semibold my-3">Total Visits: {click}</h3>
          <ScrollArea className="max-h-[350px] w-[350px] hidden custom-375:block rounded-md border p-4">
            <ol>
              {data.map((item, index) => (
                <li key={index} className="my-1">
                  <p className="text-sm">
                    <span className="font-semibold">Visited at:</span>{" "}
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </li>
              ))}
            </ol>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default Work;
