'use client';

import React from 'react';
import AdminSidebar from '../components/AdminSidebar'; // Assuming the sidebar is in the auth folder
import UserMangment from '../components/UserMangment';


const AdminDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {/* Render the User Management component */}
        <UserMangment/>
      </div>
    </div>
  );
};

export default AdminDashboard;
