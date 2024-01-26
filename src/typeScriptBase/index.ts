//void空值，表示没有返回值的函数

import React from 'react';

function identity(arg: number): number {
  return arg;
}

function identitys<Type>(arg: Type): Type {
  return arg;
}

identitys(1);

// const test = ()=>{
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const data :({filed}:{filed:any})=>React.ReactElement = ({filed:{}})=>{}
//   return data
// }

const a = 1;
export default a;
