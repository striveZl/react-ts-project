import React, { memo, useEffect, useRef, useState } from 'react';
import { FC, ReactNode } from 'react';
import Some from './ImperativeHandle';
import { Heading } from '@chakra-ui/react';
import Effect from './effect';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const Ranking: FC<IPorps> = (props, ref) => {
  const refSome = useRef<any>(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(refSome.current);
    refSome.current.changeInpValue(count);
  }, [count]);
  const clickHandler = () => {
    setCount(count + 1);
  };
  return (
    <>
      {count}
      <br />
      <button onClick={clickHandler}>点我</button>
      <Some ref={refSome} /> <div></div>
      <Heading size="lg">Effect</Heading>
      <Effect />
    </>
  );
};
export default memo(Ranking);
