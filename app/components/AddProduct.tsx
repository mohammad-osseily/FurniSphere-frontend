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

const AddProduct: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProductFormInputs>();

  const onSubmit = async (data: AddProductFormInputs) => {
    try {
      // Call the service to create the product
      await createProduct(data);

      // Success toast
      toast.success('Product created successfully!', {
        position: 'top-right', // Fix the toast position
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
2
    } catch (err) {
      // Error toast
      toast.error('Failed to create product. Please try again.', {
        position: 'top-right', // Fix the toast position
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };


};

export default AddProduct;
