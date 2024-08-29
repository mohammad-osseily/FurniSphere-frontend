// app/profile/ProfilePage.tsx
'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "../services/authServices";

const ProfilePage = () => {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    
  );
};

export default ProfilePage;
