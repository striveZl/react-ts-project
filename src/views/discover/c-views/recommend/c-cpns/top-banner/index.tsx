import { useAppSelector } from '@/store';
import { Box, Image, Stack } from '@chakra-ui/react';
import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import { shallowEqual } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface IPorps {
  children?: ReactNode;
}

//泛型约束
const TopBanner: FC<IPorps> = (props) => {
  // 从store中获取数据
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  );
  return (
    <>
      <div>
        <Box>
          {/* left */}
          <Box w="1200px" m="0 auto" bg="orange.100">
            <Box width="600px" m="0 auto">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSlideChange={() => console.log('slide change')}>
                {banners ? (
                  banners.map((item) => {
                    return (
                      <SwiperSlide key={item.imageUrl}>
                        <Stack>
                          <Image
                            w="600px"
                            objectFit="cover"
                            src={item.imageUrl}
                            alt="Dan Abramov"
                          />
                        </Stack>
                      </SwiperSlide>
                    );
                  })
                ) : (
                  <Box> loading...</Box>
                )}
              </Swiper>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};
export default memo(TopBanner);
