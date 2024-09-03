"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFromLocalStorage, logoutUser } from "../services/authServices";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

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
          <Link
            href="/"
            className="text-2xl font-bold text-gray-800 hover:text-primary transition duration-300"
          >
            FurniSphere
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link
            href="/products"
            className="text-gray-700 hover:text-primary transition duration-300"
          >
            Products
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-primary transition duration-300"
          >
            Contact Us
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-primary transition duration-300"
          >
            About Us
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="text-gray-700">Loading...</div>
          ) : user ? (
            <>
              <Link href="/cart" className="relative">
                <FaShoppingCart className="text-2xl text-gray-700 hover:text-primary transition duration-300" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <div className="dropdown dropdown-bottom">
                <div
                  tabIndex={0}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <FaUserCircle className="text-2xl text-gray-700 hover:text-primary transition duration-300" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow absolute right-0 mt-2"
                >
                  <li>
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link href="/order-history">Order History</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-left w-full">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition duration-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="flex md:hidden justify-around items-center bg-white shadow-md py-2">
        <Link
          href="/products"
          className="text-gray-700 hover:text-primary transition duration-300"
        >
          Products
        </Link>
        <Link
          href="/contact"
          className="text-gray-700 hover:text-primary transition duration-300"
        >
          Contact Us
        </Link>
        <Link
          href="/about"
          className="text-gray-700 hover:text-primary transition duration-300"
        >
          About Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
