import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Import the CORS middleware

import raceRoutes from "./routes/races.js";
import resultsRoutes from "./routes/results.js";
import registerRoutes from "./routes/register.js";
import usersRoutes from "./routes/users.js";
import loginRoutes from "./routes/login.js";

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Configure CORS
const allowedOrigins = ["http://localhost:3000"]; // Add your frontend URL here
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Include cookies if necessary
  })
);
// app.use(cors());
// Define routes
app.use("/api/races", raceRoutes);
app.use("/api/results", resultsRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/login", loginRoutes);

export default app;
