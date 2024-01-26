import { Button } from '@chakra-ui/react';
import { memo, FC, ReactNode, useState } from 'react';
interface IPorps {
  children?: ReactNode;
  testBtn?: () => void;
}

//泛型约束
const HookState: FC<IPorps> = (props) => {
  const [fn, setFn] = useState(() => someFunction);

  function handleClick() {
    setFn(() => someOtherFunction);
  }
  function someFunction() {
    console.log(1);
  }
  function someOtherFunction() {
    console.log('someOtherFunction');
  }

  // console.log('是否渲染！');
  // fn();
  return (
    <>
      <button onClick={handleClick}>useState</button>
      <Button onClick={props.testBtn}>子组件</Button>
    </>
  );
};
export default memo(HookState);
