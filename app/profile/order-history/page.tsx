// app/profile/order-history/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getOrderHistory } from "../../services/orderServices";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const orderHistory = await getOrderHistory();
        setOrders(orderHistory.orders);
      } catch (err) {
        setError("Failed to load order history");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  if (orders.length === 0) return <div>No orders found.</div>;

  return (
    
  );
};

export default OrderHistoryPage;
