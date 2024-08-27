"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "../services/authServices";

interface User {
  name: string;
  email: string;
  role: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div>
          <Link href="/" className="text-xl font-bold cursor-pointer">
            FurniSphere
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/products" className="text-gray-700 hover:underline">
            Products
          </Link>
          <Link href="/contact" className="text-gray-700 hover:underline">
            Contact Us
          </Link>
          <Link href="/about" className="text-gray-700 hover:underline">
            About Us
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-gray-700"
              >
                Profile
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <ul>
                    <li>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/profile/order-history"
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Order History
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-700 hover:text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
