import { memo, useEffect } from 'react';
import { FC, ReactNode } from 'react';
import { fetchRankingDataAction, fetchRecommendDataAction } from './store/recommend';
import { useAppDispatch } from '@/store';
import TopBanner from './c-cpns/top-banner';
import { Box } from '@chakra-ui/react';
import HotRecommend from './c-cpns/hot-recommend';
import NewAlbum from './c-cpns/new-album';
import TopRanking from './c-cpns/top-ranking';
interface IPorps {
  children?: ReactNode;
}
const Reccommend: FC<IPorps> = (props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchRecommendDataAction());
    // dispatch(fetchRankingDataAction());
  }, [dispatch]);

  return (
    <>
      <TopBanner />
      <Box
        bg="white"
        w="1200px"
        margin="0 auto"
        display="flex"
        justifyContent="space-around"
        border="1px solid rgb(240,240,240)">
        <Box w="860px" p="20px">
          <HotRecommend />
          <NewAlbum />
          <TopRanking />
        </Box>
        <Box w="330px" marginLeft="1px">
          rigth
        </Box>
      </Box>
    </>
  );
};
export default memo(Reccommend);
