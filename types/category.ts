// types/category.ts
import { Pagination } from "./pagination";

export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export type PaginatedCategories = Pagination<Category>;
