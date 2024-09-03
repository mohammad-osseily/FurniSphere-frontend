// app/order-history/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getOrderHistory } from "../services/orderServices";
import { Order } from "@/types/order";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderData = await getOrderHistory();
        setOrders(orderData.orders);
      } catch (error) {
        console.error("Failed to load order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  if (orders.length === 0)
    return <div className="text-center py-20">You have no order history.</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-semibold mb-6 text-left">
        Your Order History
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            className="bg-white shadow-lg rounded-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold mb-2">Order #{order.id}</h3>
            <p className="text-gray-600 mb-2">
              Status: <span className="font-medium">{order.status}</span>
            </p>
            <p className="text-gray-600 mb-2">
              Total:{" "}
              <span className="font-medium">
                ${Number(order.total_amount).toFixed(2)}
              </span>
            </p>
            <p className="text-gray-600 mb-2">
              Date:{" "}
              <span className="font-medium">
                {new Date(order.created_at).toLocaleDateString()}
              </span>
            </p>
            <div className="border-t mt-4 pt-4">
              <h4 className="text-lg font-semibold mb-2">Items:</h4>
              <ul>
                {order.order_items.map((item) => (
                  <li key={item.id} className="text-gray-600 mb-1">
                    {item.quantity} x {item.product.name} - $
                    {Number(item.price).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
