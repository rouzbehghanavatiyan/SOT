import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface PaginationState {
  data: any[];
  isLoading: boolean;
  hasMore: boolean;
  skip: number;
  take: number;
  error: string | null;
}

const initialState: PaginationState = {
  data: [],
  isLoading: false,
  hasMore: true,
  skip: 0,
  take: 10, // مقدار پیش‌فرض تعداد داده‌ها در هر صفحه
  error: null,
};

export const fetchPaginationData = createAsyncThunk(
  "pagination/fetchPaginationData",
  async (
    params: { skip: number; take: number; extraParams?: Record<string, any> },
    { rejectWithValue }
  ) => {
    const { skip, take, extraParams } = params;

    try {
      const response = await axios.get("/your-api-endpoint", {
        params: { skip, take, ...extraParams },
      });
      return response.data; // داده‌های دریافتی از API
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Slice برای مدیریت وضعیت Pagination
const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    resetPagination(state) {
      state.data = [];
      state.skip = 0;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginationData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchPaginationData.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          const newData = action.payload || [];
          state.data = [...state.data, ...newData];
          state.skip += state.take;
          state.hasMore = newData.length >= state.take;
          state.isLoading = false;
        }
      )
      .addCase(
        fetchPaginationData.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload || "An error occurred";
        }
      );
  },
});

export const { resetPagination } = paginationSlice.actions;
export default paginationSlice.reducer;
