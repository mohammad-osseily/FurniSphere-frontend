// app/services/authServices.ts
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Your API base URL

// Save token to local storage
export const saveTokenToLocalStorage = (token: string) => {
    localStorage.setItem('token', token);
};


