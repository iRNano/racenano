import jwt from "jsonwebtoken";

const secretKey = "your_secret_key"; // Ensure this matches the key used to sign the token

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'

  console.log("Token received:", token); // Log the token to ensure it’s passed correctly

  if (!token) {
    return res.status(401).json({ error: "Access token missing" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.error("JWT Verification failed:", err); // Log the error if token is invalid or expired
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      return res.status(403).json({ error: "Invalid token" });
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (user.exp && user.exp < currentTime) {
      console.error("Token is expired");
      return res.status(401).json({ error: "Token expired" });
    }

    req.user = user; // Attach the decoded token data to the request object
    console.log("User authenticated:", req.user);
    next(); // Pass control to the next middleware/handler
  });
};
