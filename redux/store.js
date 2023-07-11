import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import expensesSlice from "./features/expensesSlice";
import categoriesSlice from "./features/categoriesSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    expenses: expensesSlice,
    categories: categoriesSlice,
  },
});
