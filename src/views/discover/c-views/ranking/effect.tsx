import { Heading } from '@chakra-ui/react';
import React, { memo, useEffect, useInsertionEffect, useLayoutEffect, useRef } from 'react';
import { FC, ReactNode } from 'react';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const Effect: FC<IPorps> = (props) => {
  const refH3 = useRef<HTMLHeadingElement | null>(null);
  //在绘制屏幕之后
  useEffect(() => {
    console.log('useEffect', refH3);
  });
  //在绘制屏幕之前渲染
  useLayoutEffect(() => {
    console.log('useLayoutEffect', refH3);
  });

  //在dom改变之前，无法访问到ref
  useInsertionEffect(() => {
    console.log('useInsertionEffect', refH3);
  });

  return (
    <>
      <Heading ref={refH3} />
    </>
  );
};
export default memo(Effect);
