import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserInfo, touristLoginOne } from '../service';

// export const fetchSendrexAction = createAsyncThunk(
//   'sendRex',
//   async (phone: string, { dispatch }) => {
//     const res = await sendRex(phone);
    
    
//   }
// );

export const fetchTouristLoginAction = createAsyncThunk('touristLogin',async(_,{dispatch})=>{
    const res = await touristLoginOne()
    if(res.code===200){
        dispatch(getTouristTokenAction(res.cookie))
    }
})

//获取用户账号信息
export const fetchGetUserInfoAction = createAsyncThunk('getUserInfos',async(_,{dispatch})=>{
    const res = await getUserInfo()
    if(res.code===200){
        console.log(res)
    }
    console.log(res)
})

interface setuserState{
    touristToken:string | null,
    userInfo:object
}

const initialState:setuserState = {
    touristToken:localStorage.getItem("token"),
    userInfo:{}
}
const setuserSlicer = createSlice({
    name:'setuser',
    initialState,
    reducers:{
        getTouristTokenAction(state,{payload}){
            localStorage.setItem("token",payload)
            state.touristToken = payload
        },
        getUserInfosAction(state,{payload}){
            state.userInfo = payload
        }
    }
})

export const {getTouristTokenAction,getUserInfosAction} = setuserSlicer.actions

export default setuserSlicer.reducer