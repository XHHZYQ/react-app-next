import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer // 需与 counterSlice 中的 name 属性相同
  }
});