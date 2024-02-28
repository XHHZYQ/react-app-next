// Counter.js
"use client"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementByAmount } from '@/store/counterSlice.js';

const Counter = () => {
  const count = useSelector(state => {
    console.log('state', state);
    return state.counter.num; // 获取整个 store 中 counter 切片状态中的 num 属性(命名空间)
  });
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>加10</button>
    </div>
  );
};

export default Counter;
