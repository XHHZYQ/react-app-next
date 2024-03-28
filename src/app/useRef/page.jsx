"use client"

/**
 * 使用 ref 存储一个变量，ref 变量不会触发重新渲染
 */
// import { useRef } from 'react';
// import { Button } from 'antd';

// export default () => {
//   const ref = useRef(0);
//   const changeRef = () => {
//     ref.current = ref.current + 1;
//   };
//   return (
//     <div>
//       <h1>测试 ref 修改后是否重新渲染</h1>
//       <Button onClick={changeRef}>点击</Button>
//       <div>{ref.current}</div>
//     </div>
//   );
// };


/**
 * 使用 ref 操作 dom
 */
// import { useState, useRef, useEffect } from 'react';

// export default function Stopwatch() {
//   const [startTime, setStartTime] = useState(null);
//   const [now, setNow] = useState(null);
//   const [second, setSecond] = useState(0);
//   const intervalRef = useRef(null);

//   function handleStart() {
//     setStartTime(Date.now());
//     setNow(Date.now());

//     clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(() => {
//       setNow(Date.now());
//     }, 10);
//   }

//   function handleStop() {
//     clearInterval(intervalRef.current);
//   }

//   useEffect(() => {
//     if (startTime != null && now != null) {
//       const num = ((now - startTime) / 1000).toFixed(3);
//       setSecond(num);
//     }
//     console.log('second。。', second);
//   }, [now]);


//   return (
//     <>
//       <h1>Time passed: {second}</h1>
//       <button onClick={handleStart}> 开始 </button>
//       <button onClick={handleStop}> 停止 </button>
//     </>
//   );
// }

// import { useRef } from 'react';

// export default () => {
//   const inputRef = useRef(null);
//   function inputFocus() {
//     inputRef.current.focus();
//   }

//   return <>
//     <button onClick={inputFocus}>触发 input 聚焦</button>
//     输入框： <input ref={inputRef}></input>
//   </>
// }


// import { useRef } from 'react';
// import Style from './page.module.scss';

// export default function () {
//   const listRef = useRef(null);

//   function scrollToIndex(index) {
//     const listNode = listRef.current;
//     // This line assumes a particular DOM structure:
//     const imgNode = listNode.querySelectorAll('li')[index];
//     imgNode.scrollIntoView({
//       behavior: 'smooth',
//       block: 'center',
//       inline: 'end'
//     });
//   }

//   return (
//     <>
//       <nav className={Style['btn-box']}>
//         <button onClick={() => scrollToIndex(0)}> aqua </button>
//         <button onClick={() => scrollToIndex(1)}> beige </button>
//         <button onClick={() => scrollToIndex(2)}> blue </button>
//       </nav>
//       <div>
//         <ul ref={listRef}>
//           <li>
//             <div className={Style.aqua}></div>
//           </li>
//           <li>
//             <div className={Style.beige}></div>
//           </li>
//           <li>
//             <div className={Style.blue}></div>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// }



import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, inputRef) => {
  return <input {...props} ref={inputRef} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <button onClick={handleClick}> 聚焦输入框 </button>
      <MyInput ref={inputRef} />
    </>
  );
}

