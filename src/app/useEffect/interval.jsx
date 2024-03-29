"use client"
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    console.log('调用了 useEffect。。');
    return () => clearInterval(intervalId);
  }, []);

  return <h1>{count}</h1>;
}
