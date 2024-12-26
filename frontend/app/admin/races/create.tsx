// /pages/admin/race/create.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import config from "../../config/config";

const CreateRace = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRace = { name, description, date };

    try {
      const response = await fetch(`${config.apiBaseUrl}/api/races`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRace),
      });

      if (!response.ok) throw new Error("Failed to create race");
      router.push("/admin/races"); // Redirect after success
    } catch (error) {
      console.error(error);
    }
  };
  console.log("hello create");
  return (
    <div>
      <h1>Create New Race</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Race</button>
      </form>
    </div>
  );
};

export default CreateRace;
