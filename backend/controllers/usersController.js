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

export const getProfile = async (req, res) => {
  const userId = req.user.id; // Assumes token middleware sets `req.user`

  try {
    await ensureCache();
    const user = cachedUsers.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(user.profile);
  } catch (error) {
    console.error("Error retrieving profile:", error);
    res.status(500).json({ error: "Failed to retrieve profile" });
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
