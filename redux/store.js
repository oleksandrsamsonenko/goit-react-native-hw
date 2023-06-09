import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
import { mainSlice } from "./main/mainReducer";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [mainSlice.name]: mainSlice.reducer,
});

export const store = configureStore({ reducer: rootReducer });
