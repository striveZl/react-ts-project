import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const FormInput: FC<IPorps> = (props) => {
  return <>FormInput</>;
};
export default memo(FormInput);
