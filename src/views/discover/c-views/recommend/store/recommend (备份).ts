import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBanners, getHotRecommend, getNewAlbum } from '../service/recommend';

export const fetchBannerDataAction = createAsyncThunk('banner', async (arg, { dispatch }) => {
  const res = await getBanners();
  dispatch(changeBannerAction(res.banners));
});

export const fetchHotRecommendAction = createAsyncThunk(
  'hotRecommend',
  async (arg, { dispatch }) => {
    const res = await getHotRecommend(8);
    dispatch(changeHotRecommendAction(res.result));
  }
);
export const fetchNewAlbumAction = createAsyncThunk('newAlbum', async (arg, { dispatch }) => {
  const res = await getNewAlbum();
  dispatch(changeNewAlbumAction(res.albums));
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
}
const initialState: IRcommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: []
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
export const { changeBannerAction, changeHotRecommendAction, changeNewAlbumAction } =
  recommendSlicer.actions;
export default recommendSlicer.reducer;
