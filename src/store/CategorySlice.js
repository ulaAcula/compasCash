import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { categoryName: "Savings", chacked: false, category: "Budget Accounts" },
  { categoryName: "Cash", chacked: false, category: "Budget Accounts" },
  {
    categoryName: "Credit Card",
    chacked: false,
    category: "Budget Accounts",
  },
  {
    categoryName: "Line of Credit",
    chacked: false,
    category: "Budget Accounts",
  },

  {
    categoryName: "Mortgage",
    chacked: false,
    category: "Mortgages and Loans",
  },
  {
    categoryName: "Auto Loan",
    chacked: false,
    category: "Mortgages and Loans",
  },
  {
    categoryName: "Student Loan",
    chacked: false,
    category: "Mortgages and Loans",
  },
  {
    categoryName: "Personal Credit",
    chacked: false,
    category: "Mortgages and Loans",
  },
  {
    categoryName: "Medical Debt",
    chacked: false,
    category: "Mortgages and Loans",
  },
  {
    categoryName: "Other debt",
    chacked: false,
    category: "Mortgages and Loans",
  },

  {
    categoryName: "Asset(e.g. Investment)",
    chacked: false,
    category: "Tracking Accounts",
  },
  {
    categoryName: "Liability(e.g Mortgage)",
    chacked: false,
    category: "Tracking Accounts",
  },
];

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    notCategory: (state, action) => {
      state.forEach((category) => {
        category.chacked = false;
      });
    },
    activateCategory: (state, action) => {
      const categoryNameToActivate = action.payload;

      state.forEach((category) => {
        if (category.categoryName === categoryNameToActivate) {
          category.chacked = true;
        }
      });
    },
  },
});
export const { activateCategory, notCategory } = CategorySlice.actions;

export default CategorySlice.reducer;
