import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendRex, touristLoginOne } from '../service';

export const fetchSendrexAction = createAsyncThunk(
  'sendRex',
  async (phone: string, { dispatch }) => {
    const res = await sendRex(phone);
    
    
  }
);

export const fetchTouristLoginAction = createAsyncThunk('touristLogin',async(_,{dispatch})=>{
    const res = await touristLoginOne()
    if(res.code===200){
        dispatch(getTouristTokenAction(res.cookie))
    }
})

interface setuserState{
    touristToken:string | null
}

const initialState:setuserState = {
    touristToken:localStorage.getItem("token")
}
const setuserSlicer = createSlice({
    name:'setuser',
    initialState,
    reducers:{
        getTouristTokenAction(state,{payload}){
            localStorage.setItem("token",payload)
            state.touristToken = payload
        }
    }
})

export const {getTouristTokenAction} = setuserSlicer.actions

export default setuserSlicer.reducer