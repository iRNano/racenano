import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const racesFilePath = path.join(__dirname, "../data/races.json");
const profilesFilePath = path.join(__dirname, "../data/users.json");

export const getRaces = (req, res) => {
  try {
    // Check if the races file exists and is not empty
    if (
      !fs.existsSync(racesFilePath) ||
      fs.readFileSync(racesFilePath, "utf-8").trim() === ""
    ) {
      return res.status(404).json({ error: "No races found" });
    }

    const races = JSON.parse(fs.readFileSync(racesFilePath, "utf-8"));

    // Return the races data
    res.status(200).json(races);
  } catch (error) {
    console.error("Error reading races file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRaceById = (req, res) => {
  const { id } = req.params;

  try {
    const races = JSON.parse(fs.readFileSync(racesFilePath, "utf-8"));

    // Find the race by ID
    const race = races.find((race) => race.id === parseInt(id)); // Make sure id is converted to integer if it's in string form
    if (!race) {
      return res.status(404).json({ error: "Race not found" });
    }

    // Return the found race
    res.status(200).json(race);
  } catch (error) {
    console.error("Error reading races file:", error);
    res.status(500).json({ error: "Failed to fetch race" });
  }
};

export const registerForRace = (req, res) => {
  const userId = req.user?.id; // Extract user ID from authenticated token
  const raceId = parseInt(req.params.id, 10);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized access." });
  }

  const races = JSON.parse(fs.readFileSync(racesFilePath, "utf-8"));
  const race = races.find((r) => r.id === raceId);

  if (!race) {
    return res.status(404).json({ error: "Race not found." });
  }

  // Fetch user profile (assuming profiles are stored in profilesFilePath)
  let userProfile;
  try {
    const profiles = JSON.parse(fs.readFileSync(profilesFilePath, "utf-8"));
    userProfile = profiles.find((profile) => profile.id === userId);
  } catch {
    return res.status(500).json({ error: "Error fetching user profile" });
  }

  if (!userProfile) {
    return res.status(404).json({ error: "User profile not found." });
  }

  // Create a participant profile with selected fields
  const participantProfile = {
    id: userProfile.id,
    name: userProfile.name,
    bio: userProfile.profile.bio,
    location: userProfile.profile.location,
  };

  // Initialize participants array if not already present
  if (!race.participants) {
    race.participants = [];
  }

  // Check if the user is already registered
  if (race.participants.some((participant) => participant.id === userId)) {
    return res
      .status(400)
      .json({ error: "User is already registered for this race." });
  }

  // Add user profile to participants array
  race.participants.push(participantProfile);
  saveRaces(races); // Save updated race list

  res.status(200).json({
    message: "Successfully registered for the race.",
    raceId: race.id,
    participants: race.participants,
  });
};

// Helper function to save the races back to the file (make sure it's implemented correctly)
const saveRaces = (races) => {
  try {
    fs.writeFileSync(racesFilePath, JSON.stringify(races, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving races:", err);
  }
};

export const createRace = (req, res) => {
  const { name, description, date } = req.body;
  const newRace = {
    id: Date.now(),
    name,
    description,
    date,
    type,
    categories,
    photo,
    participants: [],
  };

  const races = JSON.parse(fs.readFileSync(racesFilePath, "utf-8"));
  races.push(newRace);
  fs.writeFileSync(racesFilePath, JSON.stringify(races, null, 2));
  res.status(201).json(newRace);
};

export const updateRace = (req, res) => {
  const raceId = parseInt(req.params.id, 10);
  const { name, description, date } = req.body;

  const races = JSON.parse(fs.readFileSync(racesFilePath, "utf-8"));
  const raceIndex = races.findIndex((r) => r.id === raceId);

  if (raceIndex === -1) {
    return res.status(404).json({ error: "Race not found" });
  }

  races[raceIndex] = { ...races[raceIndex], name, description, date };
  fs.writeFileSync(racesFilePath, JSON.stringify(races, null, 2));
  res.status(200).json(races[raceIndex]);
};

export const deleteRace = (req, res) => {
  const raceId = parseInt(req.params.id, 10);

  const races = JSON.parse(fs.readFileSync(racesFilePath, "utf-8"));
  const updatedRaces = races.filter((r) => r.id !== raceId);

  if (races.length === updatedRaces.length) {
    return res.status(404).json({ error: "Race not found" });
  }

  fs.writeFileSync(racesFilePath, JSON.stringify(updatedRaces, null, 2));
  res.status(200).json({ message: "Race deleted successfully" });
};
