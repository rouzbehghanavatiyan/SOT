import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "../common/Slices/main";
import { apiSlice } from "../common/Slices/apiSlice";

const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer, // اضافه کردن ردیوسر مربوط به RTK Query
  main: mainSlice,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware), // اضافه کردن Middleware مربوط به RTK Query
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
