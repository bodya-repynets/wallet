import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: {
    all: null,
    last: null,
    filtered: null,
    current: null,
    totals: { quantity: null, sum: null },
  },
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      if (action.payload.length <= 5) {
        state.expenses.last = action.payload.slice(0, action.payload.length);
      } else {
        state.expenses.last = action.payload.slice(0, 5);
      }
      if (action.payload.length <= 15) {
        state.expenses.current = action.payload.slice(0, action.payload.length);
      } else {
        state.expenses.current = action.payload.slice(0, 15);
      }
      state.expenses.totals.quantity = action.payload.length;
      state.expenses.totals.sum = action.payload.reduce((sum, curr) => {
        return sum + Number(curr.price);
      }, 0);
      state.expenses.all = action.payload;
    },
    filterExpenses: (state, action) => {
      const { arr, from, to } = action.payload;
      const filtered = arr.filter(
        (item) => item.time * 1000 < to && item.time * 1000 > from
      );
      state.expenses.filtered = filtered;
      state.expenses.totals.quantity = filtered.length;
      state.expenses.totals.sum = filtered.reduce((sum, curr) => {
        return sum + Number(curr.price);
      }, 0);
    },
    setFilterToNull: (state, action) => {
      state.expenses.filtered = null;
    },
    showMore: (state, action) => {
      state.expenses.current = action.payload.expenses.slice(
        0,
        action.payload.index + 15
      );
    },
  },
});

export const { setExpenses, filterExpenses, setFilterToNull, showMore } =
  expensesSlice.actions;

export default expensesSlice.reducer;
