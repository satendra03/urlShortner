import fs from "fs";

// Middleware to log the request to a file
export const logRequest = (filename) => {
  const timestamp = new Date().toISOString();
  return (req, res, next) => {
    const { method, url } = req;
    const log = `${method} req at path ${url} at ${timestamp}\n`;
    fs.appendFile(filename, log, (err) => {
      if (err) console.error("Error writing to log file: ", err);
      console.log("Log File Updated!");
    });
    next();
  };
};
