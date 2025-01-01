import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, "../data/users.json");

let cachedUsers = null; // Cache for user data
let isCacheLoaded = false; // Flag to track cache loading status

const loadUsersToCache = async () => {
  try {
    const fileData = await fs.readFile(usersFilePath, "utf-8");
    cachedUsers = JSON.parse(fileData);
    isCacheLoaded = true;
  } catch (error) {
    console.error("Error loading users file:", error);
    cachedUsers = [];
    isCacheLoaded = true; // Prevent further attempts to load
  }
};

const saveUsers = async (users) => {
  try {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
    cachedUsers = users; // Update cache
  } catch (error) {
    console.error("Error saving users file:", error);
    throw new Error("Failed to save users");
  }
};

// Ensure the cache is loaded before accessing it
const ensureCache = async () => {
  if (!isCacheLoaded) {
    await loadUsersToCache();
  }
};

export const getUsers = async (req, res) => {
  try {
    await ensureCache();
    res.status(200).json(cachedUsers);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

export const getCurrentUser = async (req, res) => {
  // const userId = req.user.id; // Assumes token middleware sets `req.user`

  try {
    await ensureCache();
    const userId = req.user.id;
    const user = cachedUsers.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error retrieving current user:", error);
    res.status(500).json({ error: "Failed to retrieve current user" });
  }
};

export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { bio, location, preferences } = req.body;

  try {
    await ensureCache();
    const user = cachedUsers.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: "Profile not found" });
    }

    user.profile = { ...user.profile, bio, location, preferences };
    await saveUsers(cachedUsers);

    res.json({
      message: "Profile updated successfully",
      profile: user.profile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const getUserRegistrations = async (req, res) => {
  try {
    await ensureCache();
    const userId = req.user.id;
    const user = cachedUsers.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Assuming `registeredRaces` is a field in the user object
    const registrations = user.registeredRaces || [];
    res.status(200).json(registrations);
  } catch (error) {
    console.error("Error retrieving user registrations:", error);
    res.status(500).json({ error: "Failed to retrieve registrations" });
  }
};

export const getUserResults = async (req, res) => {
  try {
    await ensureCache();
    const userId = req.user.id;
    const user = cachedUsers.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Assuming `results` is a field in the user object
    const results = user.results || [];
    res.status(200).json(results);
  } catch (error) {
    console.error("Error retrieving user results:", error);
    res.status(500).json({ error: "Failed to retrieve results" });
  }
};
