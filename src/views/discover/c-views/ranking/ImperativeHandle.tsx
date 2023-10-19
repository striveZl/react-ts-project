import React, { memo, useImperativeHandle, useRef, useState } from 'react';
import { FC, ReactNode } from 'react';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
//为组件定义一个ref
const Some = React.forwardRef<any>((props, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [count, setCount] = useState(0);

  const clickHandler = () => {
    setCount(count + 1);
    console.log(inputRef.current && inputRef.current.value);
  };

  useImperativeHandle(ref, () => {
    //回调函数的返回值，会成为ref的值
    return {
      changeInpValue(val: any) {
        if (inputRef.current != null) {
          inputRef.current.value = val;
        }
      }
    };
  });
  return (
    <div>
      <h2>Some</h2>
      <input ref={inputRef} type="text" />
      <button onClick={clickHandler}>Some BTN</button>
    </div>
  );
});
export default memo(Some);
