import { memo, FC, ReactNode, useState } from 'react';
interface IPorps {
  children?: ReactNode;
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
  fn();
  return (
    <>
      <button onClick={handleClick}>useState</button>
    </>
  );
};
export default memo(HookState);
