// types/product.ts
import { Pagination } from "./pagination";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  image: string;
  color: string;
  created_at: string;
  updated_at: string;
}
export interface Product3D {
  id: number;
  product_id: number;
  model_file_path: string;
  file_type: "gltf" | "obj" | "fbx";
  created_at: string;
  updated_at: string;
}

export type PaginatedProducts = Pagination<Product>;
