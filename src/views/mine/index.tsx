import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import InputTest from './student/inputTest';
import HooksBase from './student/hookStudent/hooksBase';
import HooksState from './student/hookStudent/hooksState';
import HooksEffect from './student/hookStudent/hooksEffect';
import ClassTest from './student/hookStudent/classTest';
import Popover from './student/uitest/popover';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const Mine: FC<IPorps> = (props) => {
  return (
    <>
      <InputTest />
      {/* <HooksBase /> */}
      <Popover />
      <h2 style={{ color: 'red', fontSize: '18px' }}>HookState</h2>
      {/* <HooksState /> */}
      {/* <HooksEffect />
      <ClassTest /> */}
    </>
  );
};
export default memo(Mine);
