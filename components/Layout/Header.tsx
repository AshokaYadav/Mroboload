'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isLogoutVisible, setLogoutVisible] = useState(false);  // State for controlling logout popup visibility
  const router = useRouter();

  // Toggle logout popup visibility
  const toggleLogoutPopup = () => {
    setLogoutVisible((prev) => !prev);
  };

  // Handle logout and redirect to login page
  const handleLogout = () => {
    // Here you can add your logout logic (e.g., clearing user session, tokens, etc.)
    router.push("/login"); // Redirect to login page
    setLogoutVisible((prev) => !prev);
  };

  return (
    <header className="bg-gray-900 text-white p-4 fixed top-0 left-64 right-0  flex justify-between items-center  ">
      <h1 className="text-2xl">Header</h1>

      {/* User Circle Icon */}
      <div
        className="w-10 h-10 rounded-full bg-gray-600 flex justify-center items-center cursor-pointer"
        onClick={toggleLogoutPopup}
      >
        <span className="text-white font-bold">U</span> {/* You can replace "U" with a user avatar */}
      </div>

      {/* Logout Popup */}
      {isLogoutVisible && (
       <div className="absolute top-16 right-2 bg-white p-4 shadow-lg rounded-md w-40">
       <button
         className="text-gray-800 cursor-pointer font-medium w-full text-left"
         onClick={handleLogout}
       >
         Logout
       </button>
     </div>
     
      )}
    </header>
  );
}









// components/Header.tsx
// export default function Header() {
//     return (
//       <header className="bg-gray-900 text-white p-4 fixed top-0 left-64 right-0 ">
//         <h1 className="text-2xl">Header</h1>
//       </header>
//     );
//   }
  