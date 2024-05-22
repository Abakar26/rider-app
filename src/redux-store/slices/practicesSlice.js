/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
// Imports

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collectPracticeOrdersAPI,
  fetchPratices,
  updatePracticeStatusAPI,
  fetchPracticeOrdersAPI,
  fetchOrdersHistoryAPI,
  fetchEnroutedPracticesAPI,
  verifyLogisticQRCodeAPI
} from '../api/practicesAPI';
import { __filter__ } from '../utils/index';

// Creating Slice for practices Data
const practicesSlice = createSlice({
  name: 'practices',
  initialState: {
    loading: false,
    hasMore: false,
    practices: [],
    enroutedPractices: [],
    selectedOrders: [],
    practiceOrders: [],
    ordersHistory: [],
    error: '',
    orderCollectedTime: '',
    ordersCollected: false
  },
  // Registering Actions for reducer
  reducers: {
    // This action will keep in sync error if any
    setError: (state, action) => {
      return { ...state, error: action.payload };
    },

    // This action will update EnRouted Order
    updateEnroutedPracticeOrders: (state, action) => {
      return {
        ...state,
        practiceOrders: action.payload
      };
    },
    // This action will set practicesData
    setPractices: (state, action) => {
      return { ...state, practices: action.payload };
    },

    // This will setOrders History
    setOrdersHistory: (state, action) => {
      return { ...state, ordersHistory: action.payload };
    },

    // This will setEnroutedPractices
    setEnroutedPractices: (state, action) => {
      return { ...state, enroutedPractices: action.payload };
    },

    // This action will set CheckedOrders
    setSelectedOrders: (state, action) => {
      return { ...state, selectedOrders: action.payload };
    },
    // This action sets Order time when order has been collected
    setOrderCollectedTime: (state, action) => {
      return { ...state, orderCollectedTime: action.payload };
    }
  },

  // adding cases for handling state life cycle of promise returned by thunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchPracticesData.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(fetchPracticesData.fulfilled, (state, action) => {
        return {
          ...state,
          practices: __filter__([...state.practices, ...action.payload.data], 'name'),
          hasMore: action.payload.data.length > 0,
          loading: false
        };
      })
      .addCase(fetchPracticesData.rejected, (state, action) => {
        return { ...state, error: action.payload, loading: false };
      })
      .addCase(fetchEnroutedPractices.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(fetchEnroutedPractices.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          enroutedPractices: action.payload.data
        };
      })
      .addCase(fetchEnroutedPractices.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(updatePracticeStatus.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(updatePracticeStatus.fulfilled, (state, action) => {
        return { ...state, loading: false };
      })
      .addCase(updatePracticeStatus.rejected, (state, action) => {
        return { ...state, error: action.payload, loading: false };
      })
      .addCase(fetchPracticeOrders.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(fetchPracticeOrders.fulfilled, (state, action) => {
        return {
          ...state,
          practiceOrders: action.payload.data,
          loading: false
        };
      })
      .addCase(fetchPracticeOrders.rejected, (state, action) => {
        return { ...state, error: action.payload, loading: false };
      })
      .addCase(fetchOrdersHistory.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(fetchOrdersHistory.fulfilled, (state, action) => {
        return {
          ...state,
          ordersHistory: __filter__([...state.ordersHistory, ...action.payload.data], 'name'),
          hasMore: action.payload.data.length > 0,
          loading: false
        };
      })
      .addCase(fetchOrdersHistory.rejected, (state, action) => {
        return { ...state, error: action.payload, loading: false };
      })
      .addCase(collectPracticeOrders.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(collectPracticeOrders.fulfilled, (state, action) => {
        return { ...state, loading: false, ordersCollected: true };
      })
      .addCase(collectPracticeOrders.rejected, (state, action) => {
        return { ...state, error: action.payload, loading: false };
      })
      .addCase(verifyLogisticQRCode.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(verifyLogisticQRCode.fulfilled, (state, action) => {
        return { ...state, loading: false };
      })
      .addCase(verifyLogisticQRCode.rejected, (state, action) => {
        return { ...state, error: action.payload, loading: false };
      });
  }
});

export const {
  setError,
  setPractices,
  setSelectedOrders,
  updateEnroutedPracticeOrders,
  setOrderCollectedTime,
  setEnroutedPractices,
  setOrdersHistory
} = practicesSlice.actions;
export default practicesSlice.reducer;

// Thunks Here
export const fetchPracticesData = createAsyncThunk('user/practices', (data, thunkAPI) => {
  return fetchPratices(data, thunkAPI);
});

export const fetchEnroutedPractices = createAsyncThunk(
  'user/EnroutedPractices',
  (data, { rejectWithValue, signal }) => {
    return fetchEnroutedPracticesAPI(data, rejectWithValue, signal);
  }
);

export const fetchPracticeOrders = createAsyncThunk(
  'user/practiceOrders',
  (data, { rejectWithValue }) => {
    return fetchPracticeOrdersAPI(data, rejectWithValue);
  }
);

export const updatePracticeStatus = createAsyncThunk(
  'user/practiceStatusUpdate',
  (data, { rejectWithValue }) => {
    return updatePracticeStatusAPI(data, rejectWithValue);
  }
);

export const collectPracticeOrders = createAsyncThunk(
  'practices/collectPracticeOrders',
  (data, { rejectWithValue }) => {
    return collectPracticeOrdersAPI(data, rejectWithValue);
  }
);

export const fetchOrdersHistory = createAsyncThunk('practices/ordersHistory', (data, thunkAPI) => {
  return fetchOrdersHistoryAPI(data, thunkAPI);
});

export const verifyLogisticQRCode = createAsyncThunk(
  'practices/verifyLogisticQRCode',
  (data, { rejectWithValue }) => {
    return verifyLogisticQRCodeAPI(data, rejectWithValue);
  }
);
