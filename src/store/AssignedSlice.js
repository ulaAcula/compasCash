import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const AssignedSlice = createSlice({
  name: "Assigned",
  initialState,
  reducers: {
    SaveArrayBack: (state, action) => {
      return [...action.payload, { render: 0, nameOfCategory: "null" }];
    },
    NewCategory: (state, action) => {
      console.log(action.payload);
      return [action.payload, ...state];
    },

    FindAndAdd: (state, action) => {
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
    FindAndRemove: (state, action) => {
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
    FindMainRemove: (state, action) => {
      return (state = action.payload);
    },
    Assigned: (state, action) => {
      const { categoryNameToUpdate, listItemToUpdate, assignedToUpdate } =
        action.payload;

      let newValue = null;

      if (/^\d+$/.test(assignedToUpdate)) {
        newValue = `${assignedToUpdate}.00`;
      } else if (/^\d+\.\d$/.test(assignedToUpdate)) {
        newValue = `${assignedToUpdate}0`;
      } else if (/^\d+(\.\d{0,2})?$/.test(assignedToUpdate)) {
        newValue = assignedToUpdate;
      } else {
        newValue = "0.00";
      }

      const updatedState = state.map((category) =>
        category.nameOfCategory === categoryNameToUpdate
          ? {
              ...category,
              nameListCategory: category.nameListCategory.map((item) =>
                item.List === listItemToUpdate
                  ? item.assigned === Number(newValue)
                    ? item
                    : { ...item, assigned: Number(newValue) }
                  : item
              ),
            }
          : category
      );

      return updatedState;
    },
    changeListNAme: (state, action) => {
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
    changeCategoryName: (state, action) => {
      const { categoryNameToUpdate, NewValue } = action.payload;
      console.log("NameTo ", categoryNameToUpdate, "new: ", NewValue);
      const updatedState = state.map((category) =>
        category.nameOfCategory === categoryNameToUpdate
          ? {
              ...category,
              nameOfCategory: NewValue,
            }
          : category
      );

      return updatedState;
    },
    AddActivity: (state, action) => {
      const { listItemToUpdate, NewValue } = action.payload;
      console.log(listItemToUpdate);
      console.log(NewValue);
      const updatedState = state.map((category) => {
        if (
          category.nameListCategory &&
          category.nameListCategory.some(
            (item) => item.List === listItemToUpdate
          )
        ) {
          return {
            ...category,
            nameListCategory: category.nameListCategory.map((item) => {
              if (item.List === listItemToUpdate) {
                return {
                  ...item,
                  activity: parseFloat(item.activity) + parseFloat(NewValue),
                };
              }
              return item;
            }),
          };
        }
        return category;
      });

      return updatedState;
    },
    RemoveActivity: (state, action) => {
      const { listItemToUpdate, NewValue } = action.payload;
      console.log(listItemToUpdate);
      console.log(NewValue);
      const updatedState = state.map((category) => {
        if (
          category.nameListCategory &&
          category.nameListCategory.some(
            (item) => item.List === listItemToUpdate
          )
        ) {
          return {
            ...category,
            nameListCategory: category.nameListCategory.map((item) => {
              if (item.List === listItemToUpdate) {
                return {
                  ...item,
                  activity: parseFloat(item.activity) - parseFloat(NewValue),
                };
              }
              return item;
            }),
          };
        }
        return category;
      });

      return updatedState;
    },
  },
});

export const {
  Assigned,
  SaveArrayBack,
  NewCategory,
  FindAndAdd,
  FindAndRemove,
  FindMainRemove,
  changeListNAme,
  changeCategoryName,
  AddActivity,
  RemoveActivity,
} = AssignedSlice.actions;
export default AssignedSlice.reducer;
