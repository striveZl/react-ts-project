import React, { Suspense, memo } from 'react';
import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import NavBar from './c-cpns/nav-bar';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const Discover: FC<IPorps> = (props) => {
  return (
    <>
      <Box mt="2">
        <NavBar />
      </Box>
      <Suspense fallback="loading...">
        <Outlet />
      </Suspense>
    </>
  );
};
export default memo(Discover);
