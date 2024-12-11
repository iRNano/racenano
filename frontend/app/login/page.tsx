"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import config from "../config/config";
import { useAuth } from "../contexts/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Login failed");
      }

      setMessage("Login successful!");
      setIsError(false);
      console.log("login", result.user);
      // Save user session information (you can customize this)
      login(result.user, result.token);

      // localStorage.setItem("userToken", result.token); // Example: Save JWT token

      // Simulate enabling the profile component (customize as needed)
      // For example, set a state in a global context for the profile component

      // Redirect based on user role
      console.log("log", result.user.role);
      if (result.user.role === "admin") {
        setTimeout(() => router.push("/admin"), 2000); // Redirect to admin dashboard if user is an admin
      } else {
        setTimeout(() => router.push("/"), 2000); // Redirect to home if user is not an admin
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message || "An error occurred during login");
      } else {
        setMessage("An unknown error occurred");
      }
      setIsError(true);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-5 text-center">Login</h1>
      {message && (
        <p
          className={`mb-4 text-center ${
            isError ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border rounded-md"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 border rounded-md"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        {`Don't have an account? `}
        <a href="/register" className="text-blue-600 hover:underline">
          Register here
        </a>
      </p>
    </div>
  );
}
