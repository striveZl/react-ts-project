import AreaHeaderV1 from '@/components/area-header-v1';
import { useAppSelector } from '@/store';
import { Box, Flex } from '@chakra-ui/react';
import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import TopRankingItem from '../top-ranking-item';
import { shallowEqual } from 'react-redux';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const TopRanking: FC<IPorps> = (props) => {
  const { rankings } = useAppSelector(
    (state) => ({
      rankings: state.recommend.rankings
    }),
    shallowEqual
  );
  return (
    <Box>
      <Box marginTop="20px">
        <AreaHeaderV1 title="榜单" moreLink="/discover/ranking" />
      </Box>
      <Flex justify="space-between">
        {rankings ? (
          rankings.map((item) => {
            return <TopRankingItem key={item.id} itemData={item} />;
          })
        ) : (
          <Box>loading...</Box>
        )}
      </Flex>
    </Box>
  );
};
export default memo(TopRanking);
