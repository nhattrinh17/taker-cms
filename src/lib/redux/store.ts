import { configureStore } from '@reduxjs/toolkit';
import settingAppReduce from './system/settingSys';
import userCurrentReduce from './app/userCurrent.slice';
import userReduce from './app/users.slice';
import voucherReduce from './app/vouchers.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      settingApp: settingAppReduce,
      userCurrent: userCurrentReduce,
      voucher: voucherReduce,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
