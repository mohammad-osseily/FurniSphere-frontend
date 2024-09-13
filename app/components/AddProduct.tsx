'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'; // For redirecting after product creation
import { createProduct } from '../services/productService'; // Create Product service
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

// Define the form inputs
interface AddProductFormInputs {
  name: string;
  description: string;
  price: number;
  category_id: number;
  image: string;
  color: string;
  stock: number;
}


};

export default AddProduct;
