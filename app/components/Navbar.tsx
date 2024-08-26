"use client";

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="mx-auto flex justify-between items-center p-4">
        <div>
          <Link href="/" className="text-xl font-bold cursor-pointer">
            <Image
              width={70}
              height={50}
              src="/static/images/logo2.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex space-x-14">
          <Link href="/products" className="cursor-pointer">
            Products
          </Link>
          <Link href="/contact" className="cursor-pointer">
            Contact Us
          </Link>
          <Link href="/about" className="cursor-pointer">
            About Us
          </Link>
        </div>
        <div className="flex space-x-10">
          <Link href="/login" className="cursor-pointer">
            Login
          </Link>
          <Link href="/register" className="cursor-pointer">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
