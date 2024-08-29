import axios from 'axios';
import { getTokenFromLocalStorage } from './authServices';

const API_URL = 'http://127.0.0.1:8000/api'; // Your API base URL

// Add a product to the cart
export const addToCart = async (productId: number, quantity: number) => {
    const token = getTokenFromLocalStorage();
    
    if (!token) {
        throw new Error('User is not authenticated');
    }

    try {
        const response = await axios.post(
            `${API_URL}/cart/products/add`, 
            { product_id: productId, quantity }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Token used:", token); // Log the token for debugging purposes
        console.log("Response data:", response.data); // Log the response for debugging
        return response.data;
    } catch (error) {
        console.error("Failed to add product to cart:", error);
        throw error;
    }
};

// Example: Implement other cart-related functions here if needed
export const getCartItems = async () => {
    const token = getTokenFromLocalStorage();
    
    if (!token) {
        throw new Error('User is not authenticated');
    }

    try {
        const response = await axios.get(`${API_URL}/cart/products`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.cart_products;
    } catch (error) {
        console.error("Failed to fetch cart items:", error);
        throw error;
    }
};

// Exporting all functions
export default {
    addToCart,
    getCartItems,
    // Add more functions here as you implement them
};
