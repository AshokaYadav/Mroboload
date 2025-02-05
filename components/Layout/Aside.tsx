// components/Aside.tsx
import Image from "next/image";
import Sidebar from "./Sidebar";

export default function Aside() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-5 h-full fixed top-0 left-0">
      {/* Logo Section */}
      <div className="flex justify-center mb-6">
        {/* Logo - You can replace the src with your own logo URL */}
        <Image
          src="https://dynamic.design.com/asset/logo/f0af4087-ffa7-453c-86f9-c192e14eb165/logo-search-grid-2x?logoTemplateVersion=1&v=638565286469030000" 
          alt="Logo"
          className="w-24 h-24 rounded-full border-8 border-gray-600"
        />
      </div>

      {/* Sidebar Links */}
      {/* <h2 className="text-xl font-bold mb-4">Sidebar</h2> */}
      <Sidebar /> {/* Import the Sidebar component */}
    </aside>
  );
}
