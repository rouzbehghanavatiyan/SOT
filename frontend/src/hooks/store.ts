import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "../common/Slices/main";
import paginationSlice from "../common/Slices/pagination";
import notificationReducer from "../common/Slices/notificationSlice";
import alertSlice from "../common/Slices/alertSlice";
import videoSlice from "../common/Slices/videoSlice";
import { apiSlice } from "../common/Slices/apiSlice";

const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  main: mainSlice,
  pagination: paginationSlice,
  notification: notificationReducer,
  alert: alertSlice,
  video: videoSlice,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
