import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const Player: FC<IPorps> = (props) => {
  return <>Template</>;
};
export default memo(Player);
