/* eslint-disable no-return-await */
// Imports

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { subscribeNotificationAPI } from '../api/subscription';

// Thunks Here
export const subscribeNotification = createAsyncThunk(
  'data/subscribeNotification',
  async (data, { rejectWithValue }) => {
    return await subscribeNotificationAPI(data, rejectWithValue);
  }
);

// Delivery Data Slice
const SubscriptionDataSlice = createSlice({
  name: 'subscriptionData',
  initialState: {
    loading: false,
    error: ''
  },
  // adding cases for handling state life cycle of promise returned by thunk
  extraReducers: (builder) => {
    builder.addCase(subscribeNotification.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(subscribeNotification.fulfilled, (state) => {
      return { ...state, loading: false };
    });
    builder.addCase(subscribeNotification.rejected, (state, action) => {
      return { ...state, error: action.payload, loading: false };
    });
  }
});

export default SubscriptionDataSlice.reducer;
