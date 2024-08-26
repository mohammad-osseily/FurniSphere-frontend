// app/components/NavbarWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const NavbarWrapper = () => {
  const pathname = usePathname();

  // Determine if the current path is login or register
  const showNavbar = !["/login", "/register"].includes(pathname);

  return showNavbar ? <Navbar /> : null;
};

export default NavbarWrapper;
