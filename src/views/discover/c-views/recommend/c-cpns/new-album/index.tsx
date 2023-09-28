import AreaHeaderV1 from '@/components/area-header-v1';
import { Box } from '@chakra-ui/react';
import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import { useAppSelector } from '@/store';
import { shallowEqual } from 'react-redux';
import SongsMenuItem from '@/components/songs-menu-item';
interface IPorps {
  children?: ReactNode;
}
//从redux中获取数据

//泛型约束
const NewAlbum: FC<IPorps> = (props) => {
  const { newAlbums } = useAppSelector(
    (state) => ({
      newAlbums: state.recommend.newAlbums
    }),
    shallowEqual
  );
  return (
    <Box>
      <Box marginTop="20px">
        <AreaHeaderV1 title="新碟上架" moreLink="/discover/album" />
      </Box>
      <Box>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={5}
          navigation
          autoplay
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}>
          {newAlbums &&
            newAlbums.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <SongsMenuItem itemData={item} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </Box>
    </Box>
  );
};
export default memo(NewAlbum);
