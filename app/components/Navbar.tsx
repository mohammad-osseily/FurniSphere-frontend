// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFromLocalStorage, logoutUser } from "../services/authServices";
import { FaShoppingCart } from "react-icons/fa";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cartItemCount, setCartItemCount] = useState<number>(0); // State for cart item count
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      const storedUser = getUserFromLocalStorage();
      if (storedUser) {
        setUser(storedUser);
        // Assuming you have a function to get cart item count
        // setCartItemCount(getCartItemCountFromLocalStorageOrApi());
      }
      setLoading(false);
    }, 500); // Simulate a delay to show the loading state
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
          {loading ? (
            <div className="text-gray-700">Loading...</div>
          ) : user ? (
            <>
              <Link href="/cart" className="relative">
                <FaShoppingCart className="text-2xl text-gray-700" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <div className="dropdown dropdown-hover">
                <label tabIndex={0} className="text-gray-700 cursor-pointer">
                  Profile
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
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
