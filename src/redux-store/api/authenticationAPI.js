/**
 * This file contains side effects for User Authentication & Management
 * Side effects, for authentication, managing profile is are handled here
 */

import axios from './axios';

// This api call is for authenticating user
export async function login(data, rejectWithValue) {
  try {
    return await axios.post(`/riders/login`, data);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

// this api call is for updating User profile image
export async function updateUserProfileImage(data, rejectWithValue) {
  try {
    return await axios.put(`/api/v1/riders/${data.userId}`, {
      riders: { profile_picture: data.profileImage }
    });
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
}

// this api call toggles Link waze
export async function toggleLinkWaze(data, rejectWithValue) {
  try {
    return await axios.patch(`/api/v1/riders/${data.userId}`, {
      riders: {
        enable_waze: !data.isLinkWazeEnabled
      }
    });
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

// this api call toggles Notification
export async function toggleNotification(data, rejectWithValue) {
  try {
    return await axios.patch(`/api/v1/riders/${data.userId}`, {
      riders: { enable_notification: !data.isNotificationEnabled }
    });
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

// this function destroys user session
export function logout() {
  const subscription = localStorage.getItem('subscription');
  localStorage.clear();
  localStorage.setItem('subscription', subscription);
}

// This api call sends OTP to user's Email
export const sendOTPAPI = async (body, rejectWithValue) => {
  try {
    return await axios.post(`/api/v1/riders/send_otp`, body);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};

// This api call verifies user OTP
export const verifyOTPAPI = async (data, rejectWithValue) => {
  try {
    return await axios.get(`/api/v1/riders/${data.id}/verify_otp?otp=${data.params.otp}`);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};

// This api call will change userPassword
export const changePasswordAPI = async (data, rejectWithValue) => {
  let url = '';
  let payload = {};
  if (Object.keys(data).includes('invitation_token') && data.invitation_token) {
    url = `/riders/invitation`;
    payload = {
      riders: {
        password: data.passwords.newPassword,
        password_confirmation: data.passwords.confirmedPassword,
        invitation_token: data.invitation_token
      }
    };
  } else {
    url = `/api/v1/riders/${data.user}/change_password`;
    payload = {
      rider: {
        password: data.passwords.newPassword,
        password_confirmation: data.passwords.confirmedPassword
      }
    };
  }
  try {
    return await axios.patch(url, payload);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};

// This api call will unlock rider accoutn
export const unlockAccountAPI = async (data, rejectWithValue) => {
  try {
    return await axios.get(`/riders/unlock?unlock_token=${data.unlock_token}`);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};

// This api call is for fetching rider details
export const fetchRiderDetailsAPI = async (data, rejectWithValue) => {
  try {
    return await axios.get(`/api/v1/riders/${data.id}`);
  } catch (error) {
    return rejectWithValue(error);
  }
};
