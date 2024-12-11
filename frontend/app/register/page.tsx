"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import config from "../config/config";
import { useRouter } from "next/navigation";

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log(result);
      if (!response.ok) throw new Error(result.error || "Failed to register");
      setSuccessMessage(result.message);

      setTimeout(() => router.push("/"), 2000);
    } catch (err: unknown) {
      if (err instanceof Error)
        setSuccessMessage(
          err.message || "An error occurred during registration"
        );
      else setSuccessMessage("Error on registration occured");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-5 text-center">Register</h1>
      {successMessage && (
        <p className="text-green-600 mb-4 text-center">{successMessage}</p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border rounded-md"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>
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
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login here
        </a>
      </p>
    </div>
  );
}
