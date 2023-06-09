import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const mainSlice = createSlice({
  name: "main",
  initialState: initialState,
  reducers: {
    setPostsList: (state, { payload }) => ({
      posts: payload,
    }),
    addNewPost: (state, { payload }) => ({
      posts: [payload, ...state.posts],
    }),
  },
});
