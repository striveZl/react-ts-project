import { Box, Button, Input } from '@chakra-ui/react';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FC, ReactNode } from 'react';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const Artist: FC<IPorps> = (props) => {
  const result = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [isWs, setIsWs] = useState<string>('');
  const ws = new WebSocket('ws://localhost:8003');
  const [resultData, setResultData] = useState<{ str: string; userName: string }[]>([]);
  useEffect(() => {
    ws.onopen = (res) => {
      setIsWs('已连接服务端!');
    };
  }, []);

  const btnRequest = useCallback(() => {
    if (!input.current) return;
    ws.send(input.current.value);
    input.current.value = '';
  }, []);
  const btnKey = useCallback((e: any) => {
    if (e.keyCode === 13) {
      if (!input.current) return;
      ws.send(input.current.value);
      input.current.value = '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  ws.onmessage = useCallback(
    (res: any) => {
      let result = JSON.parse(res.data);

      setResultData((pre) => [...resultData, { str: result.str, userName: result.userName }]);
      // setColor(result.color);
    },
    [resultData]
  );
  //递归阶乘
  function factorial(num: number): number {
    console.log(num);
    if (num < 0) {
      return -1;
    } else if (num === 0 || num === 1) {
      return 1;
    } else {
      return num * factorial(num - 1);
    }
  }
  // factorial(4); //24
  //递归斐波那契数列
  function fibonacci(num: number): number {
    if (num <= 0) {
      return 0;
    }
    if (num === 1 || num === 2) {
      return 1;
    }
    //ibonacci(2)+ibonacci(1)+ibonacci(2)
    return fibonacci(num - 1) + fibonacci(num - 2);
  }
  // fibonacci(4); // 3

  console.log(resultData);
  return (
    <Box>
      <Box w="300px" h="400px" overflowY="scroll" marginTop="30px">
        <Box w="100px" margin="0 auto">
          {isWs}
        </Box>
        {resultData.map((item, index) => {
          return (
            <Box key={index}>
              {item.str}----{item.userName}
            </Box>
          );
        })}
      </Box>
      <Input ref={input} type="text" placeholder="请输入内容" w="300px" onKeyUp={btnKey} />
      <Button ref={button} onClick={btnRequest}>
        发送请求
      </Button>
    </Box>
  );
};
export default memo(Artist);
