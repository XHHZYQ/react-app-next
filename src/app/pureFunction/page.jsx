
"use client"
import { useState } from 'react';
import Clock from './Clock.jsx';

function Cup({guest}) {

  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  const [time, setTime] = useState(new Date());
  // setInterval(() => {
  //   setTime(() => new Date());
  // }, 1000);
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
      <Clock time={time}></Clock>
    </>
  );
}

