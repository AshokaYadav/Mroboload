"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import RegistrationForm from "@/components/Auth/RegistrationForm";
// import RegistrationForm from './RegistrationForm';

const RegistrationPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = async (formData: { name: string; mobileno: string; password: string }) => {
    // Reset messages before starting submission
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("https://data-save-nraq.onrender.com/signup", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          mobileno: formData.mobileno,
          password: formData.password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Registration failed");

      // Set success message on successful registration
      setSuccessMessage("Registration successful! You can now log in.");
      router.push('/login');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Handle error if it's an instance of Error
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <RegistrationForm
          onSubmit={handleFormSubmit}
          error={error}
          successMessage={successMessage}
        />

        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
