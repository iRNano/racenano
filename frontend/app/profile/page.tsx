"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ProfilePage() {
  const { authState } = useAuth();

  // Initialize formData with the user's profile from context
  const [formData, setFormData] = useState({
    firstName: authState.user?.firstName || "",
    lastName: authState.user?.lastName || "",
    email: authState.user?.email || "",
    phone: authState.user?.profile?.phone || "",
    profilePicture: authState.user?.profile?.profilePicture || "",
    birthDate: authState.user?.profile?.birthDate || "",
    bio: authState.user?.profile?.bio || "",
    location: authState.user?.profile?.location || "",
    socialLinks: authState.user?.profile?.socialLinks || "",
    interests: authState.user?.profile?.interests || [],
    preferences: authState.user?.profile?.preferences || {},
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("Unauthorized access. Please log in.");
      }

      const response = await fetch(
        `/api/users/${authState.user?.id}`, // Use the user ID from authState
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      alert("Profile updated successfully!");
    } catch (err: unknown) {
      if (err instanceof Error)
        return setError(err.message || "Something went wrong");
      setError("Error encountered");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-5 text-center">Your Profile</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block mb-2 font-semibold">First Name</label>
        <input
          type="text"
          name="name"
          value={formData.firstName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Last Name</label>
        <input
          type="text"
          name="name"
          value={formData.lastName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Profile Picture URL</label>
        <input
          type="text"
          name="profilePicture"
          value={formData.profilePicture}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Birth Date</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* <div className="mb-4">
        <label className="block mb-2 font-semibold">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div> */}

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          Social Links (Comma Separated)
        </label>
        <input
          type="text"
          name="socialLinks"
          value={formData.socialLinks}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          Interests (Comma Separated)
        </label>
        <input
          type="text"
          name="interests"
          value={formData.interests.join(", ")}
          onChange={(e) =>
            setFormData({
              ...formData,
              interests: e.target.value
                .split(",")
                .map((interest) => interest.trim()),
            })
          }
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Preferences</label>
        <textarea
          name="preferences"
          value={JSON.stringify(formData.preferences, null, 2)}
          onChange={(e) =>
            setFormData({
              ...formData,
              preferences: JSON.parse(e.target.value),
            })
          }
          className="w-full p-2 border rounded-md"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
