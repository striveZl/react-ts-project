import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name:'counter',
    initialState:{
        count:100,
        message:"hello",
        address:'广州',
        height:1.80
    },
    reducers:{
        changeMessageAction(state,{payload}){
            state.message = payload
        }
    }
})

export const {changeMessageAction} = counterSlice.actions

export default counterSlice.reducer