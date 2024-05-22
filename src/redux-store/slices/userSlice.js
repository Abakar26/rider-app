/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
// Imports

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  login,
  logout,
  updateUserProfileImage,
  toggleLinkWaze,
  sendOTPAPI,
  verifyOTPAPI,
  changePasswordAPI,
  unlockAccountAPI,
  fetchRiderDetailsAPI
} from '../api/authenticationAPI';

// Creating user slice, where slice contains piece of application information
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isLoggedIn: false,
    authToken: '',
    loading: false,
    error: '',
    phoneNo: '',
    rider: {
      id: ''
    }
  },
  reducers: {
    // This action will destroy all user preferences
    destroyUser: (state, action) => {
      logout();
      return {
        ...state,
        user: {},
        isLoggedIn: false,
        authToken: '',
        loading: false,
        error: ''
      };
    },
    // This action will update status of user as assigned or en routed
    setUserStatus: (state, action) => {
      return { ...state, user: { ...state.user, status: action.payload } };
    },
    // This is for setting error if any when logging in or signing up
    setError: (state, action) => {
      return { ...state, error: action.payload };
    },
    setPhoneNo: (state, action) => {
      return { ...state, phoneNo: action.payload };
    },
    setNotificationSubscription: (state, action) => {
      return {
        ...state,
        user: { ...state.user, enable_notification: action.payload }
      };
    }
  },

  // adding cases for handling state life cycle of promise returned by thunk
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        localStorage.setItem('authToken', action.payload.headers.authorization);
        return {
          ...state,
          user: action.payload.data,
          isLoggedIn: true,
          authToken: action.payload.headers.authorization,
          loading: false
        };
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        return { ...state, error: action.payload, loading: false };
      })
      .addCase(updateProfile.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        return { ...state, user: action.payload.data, loading: false };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        return { ...state, error: action.payload, loading: false };
      })
      .addCase(wazeToggle.fulfilled, (state, action) => {
        return { ...state, user: action.payload.data };
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        return {
          ...state,
          rider: { ...state.rider, id: action.payload.data.rider }
        };
      })
      .addCase(sendOTP.rejected, (state, action) => {
        return { ...state, error: action.payload };
      })
      .addCase(verifyOTP.fulfilled, (state, action) => { })
      .addCase(verifyOTP.rejected, (state, action) => {
        return { ...state, error: action.payload };
      })
      .addCase(changePassword.fulfilled, (state, action) => { })
      .addCase(changePassword.rejected, (state, action) => {
        return { ...state, error: action.payload };
      })
      .addCase(unlockAccount.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(unlockAccount.fulfilled, (state, action) => {
        return { ...state, loading: false };
      })
      .addCase(unlockAccount.rejected, (state, action) => {
        return { ...state, error: action.payload, loading: false };
      })
      .addCase(fetchRiderDetails.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(fetchRiderDetails.fulfilled, (state, action) => {
        return { ...state, loading: false, user: action.payload.data };
      })
      .addCase(fetchRiderDetails.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload.data };
      });
  }
});

// Exporting actions and Reducers
export const { destroyUser, setError, setUserStatus, setPhoneNo, setNotificationSubscription } =
  userSlice.actions;
export default userSlice.reducer;

// Registering Thunks here
export const authenticateUser = createAsyncThunk(
  'user/authenticateUser',
  async (data, { rejectWithValue }) => {
    return login(data, rejectWithValue);
  }
);
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (data, { rejectWithValue }) => {
    return updateUserProfileImage(data, rejectWithValue);
  }
);

export const wazeToggle = createAsyncThunk('user/toggleWaze', async (data, { rejectWithValue }) => {
  return toggleLinkWaze(data, rejectWithValue);
});

export const sendOTP = createAsyncThunk('user/sendOTP', async (data, { rejectWithValue }) => {
  return sendOTPAPI(data, rejectWithValue);
});

export const verifyOTP = createAsyncThunk('user/verifyOTP', async (data, { rejectWithValue }) => {
  return verifyOTPAPI(data, rejectWithValue);
});

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (data, { rejectWithValue }) => {
    return changePasswordAPI(data, rejectWithValue);
  }
);

export const unlockAccount = createAsyncThunk(
  'user/unlockAccount',
  async (data, { rejectWithValue }) => {
    return unlockAccountAPI(data, rejectWithValue);
  }
);

export const fetchRiderDetails = createAsyncThunk(
  'users/fetchDetails',
  async (data, { rejectWithValue }) => {
    return fetchRiderDetailsAPI(data, rejectWithValue);
  }
);
