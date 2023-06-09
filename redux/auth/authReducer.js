import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userID: null,
  nickname: null,
  email: null,
  photoURL: null,
  stateChange: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    updateUserInfo: (state, { payload }) => ({
      ...state,
      userID: payload.userID,
      email: payload.email,
      nickname: payload.nickname,
      photoURL: payload.photoURL,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    userSignOut: () => initialState,
  },
});
