import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const AppFooter: FC<IPorps> = (props) => {
  return <>AppFooter</>;
};
export default memo(AppFooter);
