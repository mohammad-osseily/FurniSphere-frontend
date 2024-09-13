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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 md:p-8">
      <ToastContainer /> {/* Toast container to show toasts */}
      <div className="w-full max-w-lg bg-white shadow-lg text-black rounded-lg p-6 animate-fadeIn">
        <h1 className="text-2xl font-semibold text-left mb-6">Add New Product</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="animate-slideUp">
            <label htmlFor="name" className="block text-sm font-medium">Product Name</label>
            <input
              type="text"
              {...register('name', { required: 'Product name is required' })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="animate-slideUp">
            <label htmlFor="description" className="block text-sm font-medium">Description</label>
            <textarea
              {...register('description')}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="animate-slideUp">
            <label htmlFor="price" className="block text-sm font-medium">Price</label>
            <input
              type="number"
              step="0.01"
              {...register('price', { required: 'Price is required' })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div className="animate-slideUp">
            <label htmlFor="category_id" className="block text-sm font-medium">Category</label>
            <input
              type="number"
              {...register('category_id', { required: 'Category is required' })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id.message}</p>}
          </div>

          <div className="animate-slideUp">
            <label htmlFor="image" className="block text-sm font-medium">Image URL</label>
            <input
              type="string"
              {...register('image')}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="animate-slideUp">
            <label htmlFor="color" className="block text-sm font-medium">Color</label>
            <input
              type="text"
              {...register('color')}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="animate-slideUp">
            <label htmlFor="stock" className="block text-sm font-medium">Stock</label>
            <input
              type="number"
              {...register('stock', { required: 'Stock is required', min: 0 })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-primary text-white rounded-md mt-4 hover:opacity-90"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
