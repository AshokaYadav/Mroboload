'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [mobileno, setmobileno] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (!mobileno || !password) {
      setError('mobileno and Password are required');
      return;
    }

    try {
      const response = await fetch('https://data-save-nraq.onrender.com/login', {
        method: 'POST',
        body: JSON.stringify({ mobileno, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Login failed');
      
      // Redirect to home page after successful login
      router.push('/');
    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);  // Now TypeScript knows 'err' is an Error
          } else {
            setError('An unexpected error occurred');
          }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
  
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="mobileno" className="block text-sm font-medium text-gray-700">mobileno</label>
          <input
            type="mobileno"
            id="mobileno"
            value={mobileno}
            onChange={(e) => setmobileno(e.target.value)}
            placeholder="Enter your mobileno"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        
        <div className="mb-6">
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
        
        <button 
          type="submit" 
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Login
        </button>
      </form>
      
      <p className="mt-4 text-center">
        Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up here</a>
      </p>
    </div>
  </div>
  
  );
};

export default Page;

