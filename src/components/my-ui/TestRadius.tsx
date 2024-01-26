import { Box, Flex, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import React, { memo, useState } from 'react';
import { FC, ReactNode } from 'react';
interface IPorps {
  children?: ReactNode;
  isRequired?: boolean;
}

//泛型约束
const TestRadius: FC<IPorps> = ({ isRequired }) => {
  const [value, setValue] = useState('PUBLISHED');
  console.log(value);
  return (
    <Box marginTop="17px">
      <Flex>
        <Flex w="225px">
          <Text color="gray.700" fontSize="16px" fontWeight="500" lineHeight="24px">
            公开状态
          </Text>
          {isRequired && (
            <Text
              color="var(--Alert-02, #EB1607)"
              fontFamily="Inter"
              fontSize="16px"
              fontWeight="400"
              lineHeight="24px">
              *
            </Text>
          )}
        </Flex>
        <Box>
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction="row">
              <Radio colorScheme="red" value="PUBLISHED">
                公开中
              </Radio>
              <Radio colorScheme="red" value="STOPPED">
                停止中
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Flex>
    </Box>
  );
};
export default memo(TestRadius);
