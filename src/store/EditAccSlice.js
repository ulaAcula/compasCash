import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  description: "",
  cash: 0,
  id: null,
  rerenderData: 1,
  positionSidebar: true,
  Xcordinate: null,
};

const EditAccSlice = createSlice({
  name: "EditAcc",
  initialState,
  reducers: {
    EditValues(state, action) {
      state.title = action.payload.title;
      state.cash = action.payload.cash;
      state.description = action.payload.description;
      state.id = action.payload.id;
    },
    setTitle(state, action) {
      state.title = action.payload;
    },
    Position(state, action) {
      state.positionSidebar = !state.positionSidebar;
    },
    XcordinatePosition(state, action) {
      console.log(action.payload);
      state.Xcordinate = action.payload;
    },

    setCash(state, action) {
      state.cash = action.payload;
    },
    setDecription(state, action) {
      state.description = action.payload;
    },
    Rerender(state, action) {
      state.rerenderData++;
    },
  },
});
export const {
  EditValues,
  Position,
  setTitle,
  setCash,
  Rerender,
  setDecription,
  XcordinatePosition,
} = EditAccSlice.actions;

export default EditAccSlice.reducer;
