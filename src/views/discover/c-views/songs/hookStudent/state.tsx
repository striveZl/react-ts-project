import { Button, Heading } from '@chakra-ui/react';
import React, { memo, useState } from 'react';
import { FC, ReactNode } from 'react';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const State: FC<IPorps> = (props) => {
  const [numTest, setNumTest] = useState<number>(0);
  const stateTest = () => {
    let a = numTest;
    setNumTest((val) => a + 1);
    console.log(a);
  };
  return (
    <>
      <Heading size="lg">State</Heading>
      改变的值：{numTest}
      <Button onClick={stateTest} size="xs">
        点击
      </Button>
    </>
  );
};
export default memo(State);
