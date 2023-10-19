import React, { memo, useCallback, useRef, useState } from 'react';
import { FC, ReactNode } from 'react';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const InputTest: FC<IPorps> = (props) => {
  const [isComposition, setIsComposition] = useState(false);
  const textRef = useRef<HTMLInputElement>(null);
  const handleChange2 = () => {
    // 未使用输入法或使用输入法完毕才能触发
    if (!isComposition) {
      console.log(textRef.current?.value, textRef.current?.value.length);
    }
  };

  const handleComposition = useCallback(async (e: any) => {
    if (e.type === 'compositionend') {
      setIsComposition(false);
      handleChange2();
    } else {
      setIsComposition(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    </>
  );
};
export default memo(InputTest);
