// types/user.ts
import { Pagination } from "./pagination";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  created_at: string;
  updated_at: string;
}

export type PaginatedUsers = Pagination<User>;
