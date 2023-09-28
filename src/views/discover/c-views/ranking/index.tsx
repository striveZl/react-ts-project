import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const Ranking: FC<IPorps> = (props) => {
  return <>Ranking</>;
};
export default memo(Ranking);
