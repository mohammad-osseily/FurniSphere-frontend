// types/order.ts
import { Product } from ".";
import { Pagination } from "./pagination";

export interface Order {
  id: number;
  total_amount: string;
  status: string;
  order_items: OrderItem[]; // Adjust the property name to match your API response
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: string;
}

export type PaginatedOrders = Pagination<Order>;
