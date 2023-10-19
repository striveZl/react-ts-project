import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import State from './hookStudent/state';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const Songs: FC<IPorps> = (props) => {
  return (
    <>
      <State />
    </>
  );
};
export default memo(Songs);
