import { Box, Heading, Button } from '@chakra-ui/react';
import { FC, ReactNode, useEffect, useState, memo } from 'react';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const HooksEffect: FC<IPorps> = (props) => {
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    /**
     * This useEffect will be executed when:
     * 1、the component is mounted and unmounted.
     * 2、click left button.
     * 3、click right button.
     */
    console.log(`Button left clicked ${leftCount} times`);
    document.title = `Button left clicked ${leftCount} times`;
  });

  useEffect(() => {
    /**
     * This useEffect will be executed when:
     * 1、the component is mounted and unmounted.
     * 2、click right button.
     */
    console.log(`Button right clicked ${rightCount} times`);
  }, [rightCount]);

  useEffect(() => {
    /**
     * This useEffect will be executed when:
     * 1、the component is mounted and unmounted.
     */
    console.log(`I have a empty array of dependencies.`);
  }, []);
  return (
    <Box>
      <Heading size="lg">useEffect</Heading>
      <div className="flex">
        <div>
          <p>左按钮点击了 {leftCount} 次</p>
          <button onClick={() => setLeftCount(count + 1)}>左按钮</button>
        </div>
        <div>
          <p>右按钮点击了 {rightCount} 次</p>
          <button onClick={() => setRightCount(count + 1)}>右按钮</button>
        </div>
      </div>
    </Box>
  );
};
export default memo(HooksEffect);
