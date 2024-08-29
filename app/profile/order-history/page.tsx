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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Order History</h1>
      {orders.map((order) => (
        <div key={order.id} className="mb-4">
          <h2 className="text-xl font-semibold">
            Order #{order.id} - {order.status}
          </h2>
          <ul className="ml-4 mt-2">
            {order.orderItems.map((item) => (
              <li key={item.id}>
                {item.product.name} - {item.quantity} x ${item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryPage;
