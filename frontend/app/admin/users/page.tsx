"use client";

import { useState, useEffect } from "react";
import config from "../../config/config";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]); // typed users as an array of User objects

  const token = localStorage.getItem("userToken");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch users");
        const data: User[] = await response.json(); // typed the response data
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {users.length > 0 ? (
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="border p-4 rounded">
              <h2 className="font-bold">{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserManagement;
