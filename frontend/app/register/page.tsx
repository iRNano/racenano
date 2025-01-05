"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import config from "../config/config";
// import { useRouter } from "next/navigation";

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegistrationFormData>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailVerificationSent, setEmailVerificationSent] =
    useState<boolean>(false);
  // const router = useRouter();

  const onSubmit = async (data: RegistrationFormData) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`${config.apiBaseUrl}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Failed to register");
      setSuccessMessage(
        "Registration successful! Please verify your email to proceed."
      );
      setEmailVerificationSent(true);
    } catch (err: unknown) {
      if (err instanceof Error)
        setErrorMessage(err.message || "An error occurred during registration");
      else setErrorMessage("Unknown error occurred");
    }
  };

  const resendVerificationEmail = async () => {
    const email = getValues("email");

    try {
      const response = await fetch(
        `${config.apiBaseUrl}/api/resend-verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        }
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Failed to resend email");
      setSuccessMessage("Verification email resent successfully!");
    } catch (err: unknown) {
      if (err instanceof Error)
        setErrorMessage(err.message || "Error resending verification email");
      else setErrorMessage("Unknown error occurred");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-5 text-center">Register</h1>
      {successMessage && (
        <p className="text-green-600 mb-4 text-center">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-600 mb-4 text-center">{errorMessage}</p>
      )}
      {emailVerificationSent ? (
        <div className="text-center mt-4">
          <p className="text-sm">
            {`Didn't receive the verification email? `}
            <button
              onClick={resendVerificationEmail}
              className="text-blue-600 hover:underline"
            >
              Resend Verification Email
            </button>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: "Last name is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm">{errors.lastName.message}</p>
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
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              className="w-full p-2 border rounded-md"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      )}
      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login here
        </a>
      </p>
    </div>
  );
}
