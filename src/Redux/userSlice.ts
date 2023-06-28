import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

// function to get all users

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// export const { } = userSlice.actions;
export default userSlice.reducer;
