const express = require("express");
const initializeDB = require("./config/db");
const initializeUserTable = require("./models/User");
const initializeFileTable = require("./models/File");
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();
app.use(express.json());

// Initialize database and tables
(async () => {
  const db = await initializeDB();
  await initializeUserTable(db);
  await initializeFileTable(db);

  // Pass the database instance to routes
  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  // Register routes
  app.use("/auth", authRoutes);
  app.use("/files", fileRoutes);

  // Start the server
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
})();
