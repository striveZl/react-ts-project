import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./modules/counter";
import { useSelector,TypedUseSelectorHook} from "react-redux";
const store = configureStore({
    reducer:{
        counter:counterSlice
    }
})

type GetStateFnType =typeof store.getState//获取函数的类型
type IRootState = ReturnType<GetStateFnType>//获取函数返回值的类型
export const useAppSelector:TypedUseSelectorHook<IRootState> = useSelector
export default store