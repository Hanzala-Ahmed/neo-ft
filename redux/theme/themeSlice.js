"use client"; 

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
  },
});

export const { changeThemeMode } = themeSlice.actions;

export default themeSlice.reducer;
