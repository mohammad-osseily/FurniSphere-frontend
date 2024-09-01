// app/services/orderServices.ts
import axios from 'axios';
import { getTokenFromLocalStorage } from './authServices';

const API_URL = 'http://127.0.0.1:8000/api';

// Add product to cart
export const addToCart = async (productId: number, quantity: number) => {
    const token = getTokenFromLocalStorage();
    const response = await axios.post(
        `${API_URL}/cart/products/add`,
        {
            product_id: productId,
            quantity: quantity,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


