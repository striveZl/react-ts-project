import { Button, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const PopoverTest: FC<IPorps> = (props) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button>test</Button>
        </PopoverTrigger>
        <PopoverContent
          w="92px"
          borderRadius="8px"
          h="146px"
          p="17px 0"
          bgColor="white"
          pos="absolute"
          zIndex={3}
          boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)"
          inset="-28px auto auto 32px"
          _focusVisible={{ boxShadow: 'none' }}></PopoverContent>
      </Popover>
    </>
  );
};
export default memo(PopoverTest);
