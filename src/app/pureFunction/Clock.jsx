"use client"
export default function Clock({ time }) {
  let hours = time.getHours();
  let them = '';
  if (hours >= 0 && hours <= 6) {
    them = 'night';
  } else {
    them = 'day';
  }
  return (
    <h1 id="time" className={them}>
      {time.toLocaleTimeString()}
    </h1>
  );
}
