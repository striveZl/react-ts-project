import { getImageSize } from '@/untils/format';
import { PlusSquareIcon, TimeIcon } from '@chakra-ui/icons';
import { Box, Flex, Image, List, ListItem, Text } from '@chakra-ui/react';
import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
interface IPorps {
  children?: ReactNode;
  itemData: any;
}

//泛型约束
const TopRankingItem: FC<IPorps> = (props) => {
  const { itemData } = props;
  const { tracks = [] } = itemData;

  return (
    <Box marginTop="20px">
      <Flex>
        <Box>
          <Image src={getImageSize(itemData.coverImgUrl, 60)} />
        </Box>
        <Box marginLeft="10px">
          <Text>{itemData.name}</Text>
          <Flex marginTop="4px">
            <TimeIcon />
            <PlusSquareIcon marginLeft="10px" />
          </Flex>
        </Box>
      </Flex>
      <Box>
        <List>
          {tracks.map(() => {
            <ListItem>111</ListItem>;
          })}
        </List>
      </Box>
    </Box>
  );
};
export default memo(TopRankingItem);
