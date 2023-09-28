import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBanners, getHotRecommend, getNewAlbum, getPlaylistDetail } from '../service/recommend';

export const fetchRecommendDataAction = createAsyncThunk('fetchdata', (_, { dispatch }) => {
  //1.获取轮播图数据
  getBanners().then((res) => {
    dispatch(changeBannerAction(res.banners));
  });
  getHotRecommend(8).then((res) => {
    dispatch(changeHotRecommendAction(res.result));
  });
  getNewAlbum().then((res) => {
    dispatch(changeNewAlbumAction(res.albums));
  });
});

const rankingIds = [19723756, 3779629, 2884035];
const promises: Promise<any>[] = [];
export const fetchRankingDataAction = createAsyncThunk('rankingData', (_, { dispatch }) => {
  //获取榜单数据
  for (const id of rankingIds) {
    promises.push(getPlaylistDetail(id));
  }
  Promise.all(promises).then((res) => {
    const playlists = res.map((item) => item.playlist);
    dispatch(changeRanksAction(playlists));
  });
});

interface IRcommendState {
  banners: {
    imageUrl: string;
    targetId: number;
    adid: any;
    targetType: number;
    titleColor: string;
    typeTitle: string;
    url: any;
    exclusive: boolean;
    encodeId: string;
    scm: string;
    bannerBizType: string;
  }[];
  hotRecommends: {
    id: number;
    type: number;
    name: string;
    copywriter: string;
    picUrl: string;
    canDislike: boolean;
    trackNumberUpdateTime: number;
    playCount: number;
    trackCount: number;
    highQuality: boolean;
    alg: string;
  }[];
  newAlbums: any[];
  rankings: any[];
}
const initialState: IRcommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  rankings: []
};

const recommendSlicer = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannerAction(state, { payload }) {
      state.banners = payload;
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommends = payload;
    },
    changeNewAlbumAction(state, { payload }) {
      state.newAlbums = payload;
    },
    changeRanksAction(state, { payload }) {
      state.rankings = payload;
    }
  }
  // extraReducers:(builder)=>{
  //     builder.addCase(fetchBannerDataAction.pending,(state,action)=>{
  //         console.log("pending")
  //     }).addCase(fetchBannerDataAction.fulfilled,(state,{payload})=>{
  //        state.banners = payload
  //     }).addCase(fetchBannerDataAction.rejected,(state,action)=>{
  //         console.log("rejected")
  //     })
  // }
});
export const {
  changeBannerAction,
  changeHotRecommendAction,
  changeNewAlbumAction,
  changeRanksAction
} = recommendSlicer.actions;
export default recommendSlicer.reducer;
