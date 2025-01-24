// hooks/useAuthRedirect.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Corrected import
import { usePathname } from 'next/navigation';

const useAuthRedirect = () => {
  const pathname = usePathname();
  const router = useRouter();
  console.log(pathname);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // If token exists and we are on the login or signup page, redirect to the home page
    if (token && (pathname === '/login' || pathname === '/signup')) {
      router.push('/'); // Redirect to the Home page
    }

    // If no token and we're not on the login or signup page, redirect to the login page
    if (!token && (pathname !== '/login' && pathname !== '/signup')) {
      router.push('/login'); // Redirect to the Login page
    }
  }, [pathname, router]); // Ensure the hook runs when the path or router changes
};

export default useAuthRedirect;
