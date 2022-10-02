import { configureStore } from '@reduxjs/toolkit';
import { userSlice, appSlice } from './reducer';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    app: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: userSlice,
      },
      serializableCheck: false,
    }),
});
export const setupStore = () => {
  return store;
};
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
