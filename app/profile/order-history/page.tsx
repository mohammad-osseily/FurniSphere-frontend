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

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-4">Order History</div>
      <div className="bg-white p-4 rounded shadow-md">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="border-b pb-2 mb-2">
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Total:</strong> ${order.total}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              {/* Add more details as necessary */}
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
