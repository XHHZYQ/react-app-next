// store.js
import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// 初始状态
const initialState = {
  count: 0
};

// 创建 slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    }
  }
});

// 创建 Redux store
const store = configureStore({
  reducer: counterSlice.reducer
});

export const { increment, decrement } = counterSlice.actions;

export default store;
