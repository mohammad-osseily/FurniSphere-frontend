// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser, getCurrentUser, User } from "../services/authServices";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Get the current user from local storage
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = () => {
    logoutUser(); // Remove user and token from local storage
    setUser(null);
    router.push("/login"); // Redirect to login page after logout
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
            <div className="dropdown">
              <label tabIndex={0} className="cursor-pointer">
                <span className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
                  Profile
                </span>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a href="/profile">Profile</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
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
