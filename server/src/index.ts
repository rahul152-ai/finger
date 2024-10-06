import express, { Request, Response } from "express";
import http from "http";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import auth from "./routes/auth";
import dbConnect from "./db/connectDb";
import globalErrorHandler from "./middleware/errorMiddleWare";
import batch from "./routes/batch";
import student from "./routes/student";
import dashboard from "./routes/dashboard";
dotenv.config();
const app = express();
const server = http.createServer(app);
app.use(cors());

app.use(express.json({ limit: "10mb" }));

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
dbConnect();
// Set up API routes
app.use("/api/auth", auth);
app.use("/api/dashboard", dashboard);
app.use("/api/batch", batch);
app.use("/api/student", student);

// Catch-all route for undefined endpoints
app.all("*", (req: Request, res: Response) => {
  return res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// Function to start the server
function startServer(port: number) {
  // Check if the provided port is within the valid range
  if (port > 65535) {
    console.error("No available ports in the valid range.");
    return;
  }

  // Start the server
  server
    .listen(port, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost:${port}`);
    })
    .on("error", (err: NodeJS.ErrnoException) => {
      // Handle error if the port is already in use
      if (err.code === "EADDRINUSE") {
        console.log(`Port ${port} is already in use, trying next port...`);
        startServer(port + 1); // Try the next port
      } else {
        console.error(err);
      }
    });
}

// Start the server on the specified port or default to port 8080
const PORT = parseInt(process.env.PORT || "5000", 10);

startServer(PORT);
app.use(globalErrorHandler);
