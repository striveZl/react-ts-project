import React, { memo, useEffect } from 'react';
import { FC, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const Download: FC<IPorps> = (props) => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  return <>Download</>;
};
export default memo(Download);
