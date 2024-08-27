// app/profile/order-history/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getOrderHistory } from "../../services/orderServices";

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const orderData = await getOrderHistory();
      setOrders(orderData);
    };

    fetchOrderHistory();
  }, []);

