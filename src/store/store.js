import { configureStore } from "@reduxjs/toolkit";
import TokenSlice from "./TokenSlice";
import CategorySlice from "./CategorySlice";
import EditAccSlice from "./EditAccSlice";
import StateManagerSlice from "./StateManagerSlice";
import AssignedSlice from "./AssignedSlice";
const store = configureStore({
  reducer: {
    Token: TokenSlice,
    Category: CategorySlice,
    EditAcc: EditAccSlice,
    StateManager: StateManagerSlice,
    Assigned: AssignedSlice,
  },
});

export default store;
