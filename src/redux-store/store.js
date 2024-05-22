/* eslint-disable no-underscore-dangle */
import storage from 'reduxjs-toolkit-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist';
import deliveryDataSlice from './slices/deliveryDataSlice';
import practicesSlice from './slices/practicesSlice';
import tabSlice from './slices/tabSlice';
import userSlice from './slices/userSlice';
import subscriptionSlice from './slices/subscriptionSlice';

// Imports

// Defining Root Reducer: It contains all of our app reducers
const rootReducer = combineReducers({
  userReducer: userSlice,
  deliveryDataReducer: deliveryDataSlice,
  practicesReducer: practicesSlice,
  tabReducer: tabSlice,
  subscriptionReducer: subscriptionSlice
});
/*

  This will be the persisted Reducer, it will detect change in state
  and persists it again
*/
const _persistedReducer = persistReducer(
  {
    key: 'root',
    storage
  },
  rootReducer
);

// Defining Store Now
const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
// Finally defining and exporting persistor
export const persistor = persistStore(store);
// exporting store
export default store;
