import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: {
    name: string;
    email: string;
    role: string;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface AuthResponse {
  user: AuthState["user"];
  authorization: { token: string };
}

interface AuthError {
  message: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};
