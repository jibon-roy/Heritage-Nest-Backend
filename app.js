import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import url from "url";
import connectDB from "./src/config/db/db.js";
import router from "./src/api/v1/index.js";

// Create __dirname equivalent for ES modules
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://heritage-nest-site.web.app",
      "http://localhost:5173",
      process.env.DEV_URL,
      process.env.PROD_URL,
      process.env.PROD_URL2,
    ],
  })
);

// Serve static files (e.g., CSS)

// Define your API routes
app.use("/api/v1", router);

// Serve the status page
app.get("/status", (req, res) => {
  res.sendFile(path.join(__dirname, "/styles", "status.html"));
});

// Catch-all route for undefined routes
app.all("*", (req, res) => {
  res.status(404).json({ message: "Not Found", path: req.path });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
