import React from 'react';
import AdminSidebar from "../../components/AdminSidebar"  // Import the AdminSidebar
import OrderManagement from '../../components/OrderMangment';  // Your existing OrderManagement component
import { Box } from '@mui/material';

const OrdersPage = () => {
  return (
    <Box sx={{ display: 'flex', height:"100%" }}>
      {/* Render Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className='text-3xl font-semibold pb-10'>Order Mangement</div>
        <OrderManagement />
      </Box>
    </Box>
  );
};

export default OrdersPage;
