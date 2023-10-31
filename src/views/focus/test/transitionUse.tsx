import { Box } from '@chakra-ui/react';
import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const TransitionUse: FC<IPorps> = (props) => {
  return <Box>111</Box>;
};
export default memo(TransitionUse);
