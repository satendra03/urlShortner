import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import toast from "react-hot-toast";

const Work = () => {
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [click, setClick] = useState(0);
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send GET request to backend to fetch data
      const apiUrl = import.meta.env.VITE_BASE_URL;
      console.log("API URL:", `${apiUrl}/analyze/${id}`);

      const response = await fetch(`${apiUrl}/analyze/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      setLoading(false); // Stop loading
      console.log("Data:", res);
      if (response.ok) {
        setData(res.visitHistory); // Set the visit history
        setClick(res.clickCount); // Set the click count
      } else {
        console.error(res.message); // Handle errors from backend
        toast.error(res.message); // Show error message
        setClick(0);
        setData([]); // Clear data if error occurred
      }
    } catch (error) {
      setLoading(false); // Stop loading on error
      console.error("Error:", error);
      toast.error("Failed to fetch. Enter Correct ID"); // Show error message
      setClick(0);
      setData([]); // Clear data if error occurred
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
          disabled={loading} // Disable button while loading
        >
          {loading ? "fetching Data..." : "Fetch Data"} {/* Loading text */}
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
