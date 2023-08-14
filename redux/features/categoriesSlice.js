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
      console.log(action.payload);
      let ind = action.payload.length - 30;
      if (ind < 0) {
        ind = 0;
      }
      const last30 = action.payload.slice(ind, action.payload.length);
      console.log(last30);
      const categoryList = [];
      const categorySums = [];
      last30.forEach((product) => {
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
