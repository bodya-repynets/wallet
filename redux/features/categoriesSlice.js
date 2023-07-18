import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: { names: null, sums: null },
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    calculateSums: (state, action) => {
      const fromTime = new Date().getTime() - 518400000;
      const lastWeekArray = action.payload.filter(
        (item) => item.time * 1000 > fromTime
      );
      const categoryList = [];
      const categorySums = [];
      lastWeekArray.forEach((product) => {
        const { category, price } = product;
        if (categoryList.includes(category)) {
          const index = categoryList.findIndex((elem) => elem === category);
          categorySums[index] += Number(price);
        } else {
          categoryList.push(category);
          categorySums.push(Number(price));
        }
      });
      state.categories.names = categoryList;
      state.categories.sums = categorySums;
    },
  },
});

export const { calculateSums } = categoriesSlice.actions;

export default categoriesSlice.reducer;
