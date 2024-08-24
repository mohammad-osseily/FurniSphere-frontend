// app/store/store.ts
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authReducer from "./slices/authSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = AppState; // Ensure RootState is defined and exported

export const wrapper = createWrapper<AppStore>(makeStore);
