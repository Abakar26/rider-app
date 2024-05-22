/**
 * This file contains side effects for Practices Data
 * Side effects, for fetching, & updating practices data are handled here
 */

import axios from './axios';

// This api call fetches deliveryOverviewdata
export async function fetchDeliveryData(userId, rejectWithValue) {
  try {
    return await axios.get(`/api/v1/riders/${userId}/orders_history`);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

// This api call fetches practices data
export async function fetchPratices(params, thunkAPI) {
  try {
    return await axios.get(`/api/v1/practices/search`, {
      params,
      signal: thunkAPI.signal
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
}

// This api call fetches practices which are enrouted
export async function fetchEnroutedPracticesAPI(params, rejectWithValue, signal) {
  try {
    return await axios.get(`/api/v1/practices/search?rider_id=${params.riderId}&status=en-route`, {
      signal
    });
  } catch (error) {
    return rejectWithValue(error?.response.data);
  }
}

// This api call update Practice Status
export async function updatePracticeStatusAPI(data, rejectWithValue) {
  try {
    return await axios.put(`/api/v1/riders/${data.userId}/update_rider_orders`, data);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

// This api call collects practices order
export async function collectPracticeOrdersAPI(data, rejectWithValue) {
  try {
    return await axios.put(`/api/v1/practices/${data.id}/collect_practice_orders`, data);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

// This api call fetches orders against practice
export async function fetchPracticeOrdersAPI(data, rejectWithValue) {
  try {
    return await axios.get(
      `/api/v1/orders/practice_rider_orders?rider_id=${data.riderId}&practice_id=${data.practiceId}`
    );
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

// This api call fetches history of collected orders
export async function fetchOrdersHistoryAPI(params, thunkAPI) {
  try {
    return await axios.get('api/v1/practices/search_history', {
      params,
      signal: thunkAPI.signal
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
}

// This api call fetches history of collected orders
export async function verifyLogisticQRCodeAPI(data, rejectWithValue) {
  try {
    return await axios.get(
      `/api/v1/practices/${data.practiceId}/verify_hcp?hcp_code=${data.params.hcp_code}`
    );
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
