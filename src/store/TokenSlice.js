import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: "", sidebar: 1 };

const TokenSlice = createSlice({
  name: "Token",
  initialState,
  reducers: {
    TokenUser(state, action) {
      state.token = action.payload;
    },
    sidebarCloser(state, action) {
      state.sidebar++;
    },
  },
});
export const { TokenUser, sidebarCloser } = TokenSlice.actions;

export default TokenSlice.reducer;
