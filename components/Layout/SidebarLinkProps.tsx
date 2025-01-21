// components/SidebarLink.tsx
import Link from "next/link";

interface SidebarLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function SidebarLink({ href, children }: SidebarLinkProps) {
  return (
    <li>
      <Link href={href}  className="text-white hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md transition duration-200 ease-in-out block">
        {children}
      </Link>
    </li>
  );
}
