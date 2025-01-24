// pages/login.tsx
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/Auth/InputField';
import SubmitButton from '@/components/Auth/SubmitButton';
import useAuthRedirect from '@/hooks/useAuthRedirect';
// import InputField from '../components/InputField'; // Import InputField
// import SubmitButton from '../components/SubmitButton'; // Import SubmitButton

const Page = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [mobileno, setMobileno] = useState('');
  const [password, setPassword] = useState('');

  useAuthRedirect();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
  
    // Basic validation
    if (!mobileno || !password) {
      setError('mobileno and Password are required');
      return;
    }
  
    try {
      const response = await fetch('https://data-save-nraq.onrender.com/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ mobileno, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) throw new Error('Login failed');
  
      const data = await response.json();
  
      // Store user data and token in localStorage
      localStorage.setItem('user', JSON.stringify(data.signin));  // Save the user details
      localStorage.setItem('token', data.token);  // Save the token
  
      console.log('Login successful:', data);
  
      // Redirect to home page after successful login
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);  // Now TypeScript knows 'error' is an Error
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
          <InputField
            label="Mobileno"
            name="mobileno"
            type="text"
            value={mobileno}
            onChange={(e) => setMobileno(e.target.value)}
            placeholder="Enter your mobileno"
            required
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <SubmitButton text="Login" onClick={() => {}} /> {/* onClick is not required here */}
        </form>
        
        <p className="mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Page;
