// app/services/authServices.ts
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Your API base URL

// Save token to local storage
export const saveTokenToLocalStorage = (token: string) => {
    localStorage.setItem('token', token);
};

// Save user to local storage
export const saveUserToLocalStorage = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
};

// Get token from local storage
export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
};

// Get user from local storage
export const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Remove token and user from local storage
export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// Login function
export const loginUser = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { token } = response.data.authorization;
    const { user } = response.data;
    
    saveTokenToLocalStorage(token);
    saveUserToLocalStorage(user);

    return user;
};

// Register function
export const registerUser = async (name: string, email: string, password: string, password_confirmation: string) => {
    const response = await axios.post(`${API_URL}/auth/register`, { name, email, password, password_confirmation });
    const { token } = response.data.authorization;
    const { user } = response.data;
    
    saveTokenToLocalStorage(token);
    saveUserToLocalStorage(user);

    return user;
};

