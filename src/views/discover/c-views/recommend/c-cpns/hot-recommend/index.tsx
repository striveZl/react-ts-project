import AreaHeaderV1 from '@/components/area-header-v1';
import SongsMenuItem from '@/components/songs-menu-item';
import { useAppSelector } from '@/store';
import { Flex } from '@chakra-ui/react';
import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import { shallowEqual } from 'react-redux';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const HotRecommend: FC<IPorps> = (props) => {
  const { hotRecommend } = useAppSelector(
    (state) => ({
      hotRecommend: state.recommend.hotRecommends
    }),
    shallowEqual
  );
  return (
    <>
      <AreaHeaderV1
        title="热门推荐"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        moreLink="/discover/songs"
      />
      <Flex justify="space-between" wrap="wrap">
        {hotRecommend &&
          hotRecommend.map((item) => {
            return <SongsMenuItem key={item.id} itemData={item} />;
          })}
      </Flex>
    </>
  );
};
export default memo(HotRecommend);
