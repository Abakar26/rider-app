/* eslint-disable import/prefer-default-export */
import axios from './axios';

export const subscribeNotificationAPI = async (data, rejectWithValue) => {
  try {
    return await axios.post('/api/v1/subscriptions/subscribe', data);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};
