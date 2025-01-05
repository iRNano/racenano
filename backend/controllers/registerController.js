import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, "../data/users.json");

const getUsers = () => {
  return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

export const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    bio,
    location,
    role,
  } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ error: "Name, email, password, and confirmation are required." });
  }

  console.log("register", role);
  // Check password confirmation
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  const users = getUsers();
  const existingUser = users.find((user) => user.email === email);

  // Check for existing user
  if (existingUser) {
    return res.status(400).json({ error: "Email is already registered." });
  }

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      email,
      password: hashedPassword, // Save the hashed password
      profile: {
        bio: bio || "", // Default empty if not provided
        location: location || "", // Default empty if not provided
        preferences: {}, // Default preferences
      },
      role: role || "regular",
      verified: false, // Default role is "regular" if not provided
    };

    // Add new user to the list and save
    users.push(newUser);
    saveUsers(users);

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
