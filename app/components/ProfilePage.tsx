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
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <div className="mb-4">
        <strong>Name:</strong> {user.name}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {user.email}
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
