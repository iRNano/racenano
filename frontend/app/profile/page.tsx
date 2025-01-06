"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ProfilePage() {
  const { authState } = useAuth();
  const isVerified = authState.user?.isVerified || false; // Check if user is verified

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
    address: {
      street: authState.user?.profile?.address?.street || "",
      city: authState.user?.profile?.address?.city || "",
      state: authState.user?.profile?.address?.state || "",
      zipCode: authState.user?.profile?.address?.zipCode || "",
      country: authState.user?.profile?.address?.country || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
      {/* Personal Information */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          disabled={!isVerified}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          disabled={!isVerified}
        />
      </div>
      {/* Address Section */}
      <h2 className="text-lg font-bold mt-5 mb-3">Address</h2>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Street</label>
        <input
          type="text"
          name="address.street"
          value={formData.address.street}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          disabled={!isVerified}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">City</label>
        <input
          type="text"
          name="address.city"
          value={formData.address.city}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          disabled={!isVerified}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">State</label>
        <input
          type="text"
          name="address.state"
          value={formData.address.state}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          disabled={!isVerified}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Zip Code</label>
        <input
          type="text"
          name="address.zipCode"
          value={formData.address.zipCode}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          disabled={!isVerified}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Country</label>
        <input
          type="text"
          name="address.country"
          value={formData.address.country}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          disabled={!isVerified}
        />
      </div>
      {/* Other Fields */}
      {/* Include existing fields like socialLinks, interests, and preferences here */}
      <button
        onClick={handleSave}
        className={`w-full py-2 rounded-md text-white ${
          isLoading || !isVerified
            ? "bg-gray-400 cursor-not-allowed pointer-events-none"
            : "bg-green-600 hover:bg-green-700"
        }`}
        disabled={isLoading || !isVerified}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
