"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation'

const RegistrationPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [mobileno, setmobileno] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (!name || !mobileno || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("https://data-save-nraq.onrender.com/signup", {
        method: "POST",
        body: JSON.stringify({ name, mobileno, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Registration failed");

      // Set success message on successful registration
      setSuccessMessage("Registration successful! You can now log in.");
      router.push('/login');

      // Optionally, clear form fields after submission
      setName("");
      setmobileno("");
      setPassword("");
      setConfirmPassword("");
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
    
    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

    <form onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="mobileno" className="block text-sm font-medium text-gray-700">mobileno Number</label>
        <input
          type="text"
          id="mobileno"
          value={mobileno}
          onChange={(e) => setmobileno(e.target.value)}
          placeholder="Enter your mobileno number"
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <button 
        type="submit" 
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        Register
      </button>
    </form>

    <p className="mt-4 text-center">
      Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
    </p>
  </div>
</div>

  );
};

export default RegistrationPage;
