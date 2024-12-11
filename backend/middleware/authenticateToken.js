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
      console.error("JWT Verification failed:", err); // Log the error if token is invalid
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = user; // Attach the decoded token data to the request object
    next(); // Pass control to the next middleware/handler
  });
};
