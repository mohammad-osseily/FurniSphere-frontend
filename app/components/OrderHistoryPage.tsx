// app/profile/OrderHistoryPage.tsx
'use client'
import React, { useEffect, useState } from "react";
import { getOrderHistory } from "../services/orderServices";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrderHistory();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      }
    };

    fetchOrders();
  }, []);

 
