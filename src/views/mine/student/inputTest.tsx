import React, { memo, useCallback, useRef, useState } from 'react';
import { FC, ReactNode } from 'react';
// import HooksState from './hookStudent/hooksState';
// import { Button } from '@chakra-ui/react';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const InputTest: FC<IPorps> = (props) => {
  const [isComposition, setIsComposition] = useState(false);
  const textRef = useRef<HTMLInputElement>(null);

  const handleChange2 = useCallback(() => {
    // 未使用输入法或使用输入法完毕才能触发
    console.log(isComposition);
    if (!isComposition) {
      console.log(textRef.current?.value, textRef.current?.value.length);
    }
  }, [isComposition]);

  const handleComposition = useCallback((e: React.CompositionEvent<HTMLInputElement>) => {
    if (e.type === 'compositionend') {
      console.log(1);
      setIsComposition(false);
      handleChange2();
    } else {
      setIsComposition(true);
    }
  }, []);

  // const btnCallback = () => {
  //   setCallBack(callBack + 1);
  // };

  // const testBtn = useCallback(() => {
  //   console.log(callBack);
  // }, []);
  // console.log(callBack);
  return (
    <>
      {isComposition && 'true'}
      <input
        type="text"
        onChange={handleChange2}
        onCompositionStart={handleComposition}
        onCompositionEnd={handleComposition}
        placeholder="使用了composition的input框"
        ref={textRef}
      />
      {/* <HooksState testBtn={testBtn} />
      <Button onClick={btnCallback}>定义一个按钮</Button> */}
    </>
  );
};
export default memo(InputTest);
