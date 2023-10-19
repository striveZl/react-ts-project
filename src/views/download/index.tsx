import FormInput from '@/components/my-ui/FormInput';
import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const Download: FC<IPorps> = (props) => {
  return (
    <>
      <FormInput />
    </>
  );
};
export default memo(Download);
