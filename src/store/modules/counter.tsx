import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 100,
    message: 'hello',
    address: '广州',
    height: 1.8
  },
  reducers: {
    // action的类型解构
    changeMessageAction(state, { payload }: PayloadAction<string>) {
      state.message = payload;
    }
  }
});

export const { changeMessageAction } = counterSlice.actions;

export default counterSlice.reducer;
