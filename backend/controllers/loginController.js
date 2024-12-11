import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, "../data/users.json");
const secretKey = "your_secret_key"; // Replace with a strong secret key

const getUsers = () => {
  return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const users = getUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err || !isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.status(200).json({
      message: "Login successful",
      token, // Send the token to the frontend
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
};
