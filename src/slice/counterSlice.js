import {createSlice} from "@reduxjs/toolkit";

// basic example slice copied from the docs
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 1,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// destructure actions and reducer from the slice (or you can access as counterSlice.actions)
const { actions, reducer } = counterSlice;

// export individual action creator functions
export const { increment, decrement, incrementByAmount } = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;