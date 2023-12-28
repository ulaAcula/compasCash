import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
const initialState = [{ EachSatate: false }];

const StateManagerSlice = createSlice({
  name: "StateManager",
  initialState,
  reducers: {
    changeListNAmeS: (state, action) => {
      const { categoryNameToUpdate, listItemToUpdate, NewValue } =
        action.payload;

      const updatedState = state.map((category) =>
        category.nameOfCategory === categoryNameToUpdate
          ? {
              ...category,
              nameListCategory: category.nameListCategory.map((item) =>
                item.List === listItemToUpdate
                  ? { ...item, List: NewValue }
                  : item
              ),
            }
          : category
      );

      return updatedState;
    },
    NewCategoryS: (state, action) => {
      console.log(action.payload);
      return [action.payload, ...state];
    },

    FindAndAddS: (state, action) => {
      const { CategoryToUpdate, HowToFind } = action.payload;

      return state.map((category) =>
        category.nameOfCategory === HowToFind
          ? {
              ...category,
              nameListCategory: [
                CategoryToUpdate,
                ...category.nameListCategory,
              ],
            }
          : category
      );
    },
    FindAndRemoveS: (state, action) => {
      const { Update, HowToFind } = action.payload;

      return state.map((category) =>
        category.nameOfCategory === HowToFind
          ? {
              ...category,
              nameListCategory: Update,
            }
          : category
      );
    },
    FindMainRemoveS: (state, action) => {
      return (state = action.payload);
    },
    SaveNewArray: (state, action) => {
      return action.payload;
    },
    UpdateEachSatate: (state) => {
      return produce(state, (draftState) => {
        draftState[0].EachSatate = !draftState[0].EachSatate;
      });
    },
    JustChange: (state, action) => {
      const { categoryNameToUpdate, listItemToUpdate } = action.payload;

      const updatedState = state.map((category) =>
        category.nameOfCategory === categoryNameToUpdate
          ? {
              ...category,
              nameListCategory: category.nameListCategory.map((item) =>
                item.List === listItemToUpdate
                  ? { ...item, statate: !item.statate }
                  : item
              ),
            }
          : category
      );

      return state !== updatedState ? updatedState : state;
    },
    JustFalse: (state, action) => {
      const { categoryNameToUpdate, listItemToUpdate } = action.payload;

      const updatedState = state.map((category) =>
        category.nameOfCategory === categoryNameToUpdate
          ? {
              ...category,
              nameListCategory: category.nameListCategory.map((item) => ({
                ...item,
                statate: false,
              })),
            }
          : category
      );

      return state !== updatedState ? updatedState : state;
    },

    FindAndChange: (state, action) => {
      return state.map((category) =>
        category.nameOfCategory === action.payload
          ? {
              ...category,
              nameListCategory: category.nameListCategory.map((item) => ({
                ...item,
                statate: !category.statate,
              })),
              statate: !category.statate,
            }
          : category
      );
    },

    UpdateSatate: (state) => {
      return produce(state, (draftState) => {
        const newEachSatate =
          draftState && draftState[0] && draftState[0].EachSatate;
        if (draftState) {
          draftState.forEach((category) => {
            if (category.nameListCategory) {
              category.statate = newEachSatate;
              category.nameListCategory.forEach((item) => {
                item.statate = newEachSatate;
                item.property = newEachSatate;
              });
            }
          });
        }
      });
    },
  },
});

export const {
  changeListNAmeS,
  UpdateEachSatate,
  UpdateSatate,
  FindAndChange,
  JustChange,
  FindMainRemoveS,
  FindAndAddS,
  NewCategoryS,
  SaveNewArray,
  FindAndRemoveS,
  JustFalse,
} = StateManagerSlice.actions;
export default StateManagerSlice.reducer;
