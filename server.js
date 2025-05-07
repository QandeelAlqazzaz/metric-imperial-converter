"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse URL-encoded bodies and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from 'public' directory
app.use(express.static("public"));

// Mount our API router at /api
const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

// Root route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// only listen when *not* testing
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
