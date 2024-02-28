import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  num: 0
};

export const counterSlice = createSlice({
  name: 'counter', // 需与 configureStore 中的 name 属性相同
  initialState,
  reducers: {
    increment: (state) => {
      state.num += 1;
    },
    decrement: (state) => {
      state.num -= 1;
    },
    incrementByAmount: (state, action) => {
      state.num += action.payload
    }
  },
});

// console.log('counterSlice', counterSlice);

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;