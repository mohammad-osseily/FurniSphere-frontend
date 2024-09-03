// app/profile/OrderHistoryPage.tsx
"use client";
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

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Order History</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="mb-4">
              <div>Order ID: {order.id}</div>
              <div>Total Amount: ${order.total_amount}</div>
              <div>Status: {order.status}</div>
              <div>
                Items:
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.id}>
                      {item.product.name} - Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No order history found.</p>
      )}
    </div>
  );
};

export default OrderHistoryPage;
