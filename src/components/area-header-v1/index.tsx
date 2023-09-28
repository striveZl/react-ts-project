import { Box, Flex, Text, Heading } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
interface IPorps {
  children?: ReactNode;
  title?: string;
  keywords?: string[];
  moreText?: string;
  moreLink?: string;
}
//泛型约束
const AreaHeader: FC<IPorps> = (props) => {
  const { title = '默认标题', keywords = [], moreText = '更多', moreLink = '/' } = props;
  return (
    <>
      <Flex justifyContent="space-between">
        <Flex>
          <Heading as="h2" size="sm" noOfLines={1}>
            {title}
          </Heading>
          <Flex>
            {keywords.map((item, index) => {
              return (
                <Flex key={index} paddingLeft="20px" lineHeight="16px">
                  <Text fontSize="15px" _hover={{ cursor: 'pointer' }}>
                    {item}
                  </Text>
                  {index < keywords.length - 1 && <Text marginLeft="20px">|</Text>}
                </Flex>
              );
            })}
          </Flex>
        </Flex>
        <Box lineHeight="10px">
          <Link to={moreLink}>{moreText}</Link>
          <ArrowForwardIcon />
        </Box>
      </Flex>
    </>
  );
};
export default memo(AreaHeader);
