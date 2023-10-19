import { Box, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { ReactNode } from 'react';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const HooksBase = () => {
  // 函数组件中没有this
  const [count, setCount] = useState(0);
  const [scrollVisible, setScrollVisible] = useState<boolean>();
  const add = () => {
    let newCount = count;
    console.log('value1', count); // 0
    setCount((newCount += 1));
    console.log('value2', count); // 0
    query(newCount);
  };
  useEffect(() => {
    console.log(count);
  }, [count]);
  const query = (count: number) => {
    console.log('query函数中：', count); // 0
  };

  const handleTableScroll = useCallback(() => {
    if (document?.getElementById('EnterpriseListTable')?.scrollLeft) {
      setScrollVisible(true);
    } else setScrollVisible(false);
  }, [setScrollVisible]);
  useEffect(() => {
    window.addEventListener('scroll', handleTableScroll, true);
    return () => {
      window.removeEventListener('scroll', handleTableScroll);
    };
  }, [handleTableScroll]);

  return (
    <div>
      <p>{count}</p>
      <button onClick={add}>增加</button>
      <Box id="EnterpriseListTable" mt="24px" borderRadius="8px" overflow="hidden" pb="48px">
        <Box overflowX="scroll" overflowY="hidden" bg="red">
          <Table>
            <Thead minW="unset">
              <Tr>
                <Th minW="381px" position="sticky" left="0px" bgColor="white" zIndex={99}>
                  名称
                </Th>
                <Th position="sticky" left="381px" bgColor="white" w="56px" zIndex={99}></Th>
                <Th minW="381px">昵称</Th>
                <Th minW="381px">状态</Th>
                <Th minW="381px">url地址</Th>
              </Tr>
            </Thead>
            <Tbody></Tbody>
          </Table>
        </Box>
      </Box>
    </div>
  );
};
export default memo(HooksBase);
