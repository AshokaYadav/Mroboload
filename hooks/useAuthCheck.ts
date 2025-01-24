// hooks/useAuthCheck.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuthCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // If token doesn't exist, redirect to login page
    if (!token) {
      router.push('/login');
    }
    // Optional: Add expiration check for JWT token here
  }, [router]);
};

export default useAuthCheck;
