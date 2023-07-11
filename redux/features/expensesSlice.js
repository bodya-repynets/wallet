import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: null,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const { setExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;
