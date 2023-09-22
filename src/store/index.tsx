import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./modules/counter";
import { useSelector,TypedUseSelectorHook, useDispatch} from "react-redux";

const store = configureStore({
    reducer:{
        counter:counterSlice
    }
})

type GetStateFnType =typeof store.getState//获取函数的类型
type IRootState = ReturnType<GetStateFnType>//获取函数返回值的类型
type DisparchType = typeof store.dispatch

export const useAppSelector:TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch:() => DisparchType = useDispatch

export default store