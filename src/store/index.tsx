import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './modules/counter';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import recommendSlicer from '@/views/discover/c-views/recommend/store/recommend';
import playerReducer from '@/views/player/store/player';
import setuserSlicer from '@/views/setuser/store/index';
const store = configureStore({
  reducer: {
    counter: counterSlice,
    recommend: recommendSlicer,
    player: playerReducer,
    setuser: setuserSlicer
  }
});

type GetStateFnType = typeof store.getState; //获取函数的类型
type IRootState = ReturnType<GetStateFnType>; //获取函数返回值的类型
type DisparchType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: () => DisparchType = useDispatch;
export default store;
