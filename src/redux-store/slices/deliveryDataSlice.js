/* eslint-disable no-use-before-define */
// Imports

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDeliveryData } from '../api/practicesAPI';

// Delivery Data Slice
const deliveryDataSlice = createSlice({
  name: 'deliveryData',
  initialState: {
    error: '',
    loading: false,
    data: {}
  },
  // adding cases for handling state life cycle of promise returned by thunk
  extraReducers: (builder) => {
    builder.addCase(fetchDeliveryOverviewData.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchDeliveryOverviewData.fulfilled, (state, action) => {
      return { ...state, data: action.payload.data, loading: false };
    });
    builder.addCase(fetchDeliveryOverviewData.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
  }
});

export default deliveryDataSlice.reducer;

// Thunks Here
export const fetchDeliveryOverviewData = createAsyncThunk(
  'data/deliveryData',
  async (data, { rejectWithValue }) => {
    return fetchDeliveryData(data, rejectWithValue);
  }
);
