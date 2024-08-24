// types/order.ts
import { Pagination } from "./pagination";

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "canceled";
  address_line: string;
  city: string;
  comment: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
}

export type PaginatedOrders = Pagination<Order>;
