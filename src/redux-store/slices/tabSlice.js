import { createSlice } from '@reduxjs/toolkit';

// Creating Slice for practices Data
const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    current: ''
  },
  // Registering Actions for reducer
  reducers: {
    setCurrentTab: (state, action) => {
      return { ...state, current: action.payload };
    }
  }
});

export const { setCurrentTab } = tabSlice.actions;
export default tabSlice.reducer;
