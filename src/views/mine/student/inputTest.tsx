import { Button } from '@chakra-ui/react';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
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
  const [testValue, setTestValue] = useState(false);
  const handleChange2 = useCallback(() => {
    // 未使用输入法或使用输入法完毕才能触发
    console.log(isComposition);
    if (!isComposition) {
      console.log(textRef.current?.value, textRef.current?.value.length);
    }
  }, [isComposition]);

  const handleComposition = useCallback(
    (e: React.CompositionEvent<HTMLInputElement>) => {
      if (e.type === 'compositionend') {
        console.log(false);
        //结论：加依赖的时候（当我结束输入法的时候，先执行了change事件，这时isComposition为true，然后才执行setIsComposition(false)，接着手动执行change事件
        //但这个时候isComposition还没有更新为false，当最后一次change执行完后isComposition才更新为false（产生的原因是因为setState在事件函数或useEffect中
        //会异步执行，它会收集所有的状态变更，然后比对优化，最后做一次变更，所以导致了等最后一次的change执行完后isComposition才更新为false ）

        //但当我不给输入法事件加依赖的时候（先执行了change事件，这时isComposition为true，然后才执行setIsComposition(false)，接着手动执行change事件）
        //但这个时候我所执行的change事件是第一次执行的那个作用域中的那个事件（因为没有加依赖，他缓存的那个事件函数始终没有发生改变，也就是说这个时候手动执行的change事件始终停留在第一次执行上下文的时候）
        //因为默认的isComposition为false，那么第一次执行的那个作用域中的change事件里面的isComposition也为false，所为导致了不加事件依赖isComposition的值为false
        handleChange2();
      } else {
        setIsComposition(true);
      }
    },
    [handleChange2]
  );

  // const btnCallback = () => {
  //   setCallBack(callBack + 1);
  // };

  // const testBtn = useCallback(() => {
  //   console.log(callBack);
  // }, []);
  // console.log(callBack);
  const testFun = useCallback(() => {
    console.log(testValue);
  }, [testValue]);

  const clickBtn = useCallback(() => {
    setTestValue(true);
    testFun();
  }, [testFun]);

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
      <br />
      <Button onClick={clickBtn}>test</Button>
      <Button onClick={testFun}>另一button按钮</Button>
      <br />
      {/* <HooksState testBtn={testBtn} />
      <Button onClick={btnCallback}>定义一个按钮</Button> */}
    </>
  );
};
export default memo(InputTest);
