import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

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
  take: 6, // مقدار پیش‌فرض برای تعداد آیتم‌ها در هر صفحه
  error: null,
};

// Thunk برای دریافت داده‌های صفحه‌بندی
export const fetchPaginationData = createAsyncThunk(
  "pagination/fetchPaginationData",
  async (
    params: {
      service: (params: Record<string, any>) => Promise<any>;
      skip: number;
      take: number;
      extraParams?: Record<string, any>;
    },
    { rejectWithValue, getState }
  ) => {
    const { service, skip, take, extraParams } = params;
    try {
      const response = await service({ skip, take, ...extraParams });
      const state = getState() as any; // دریافت کل استیت
      return {
        res: response?.data,
        anotherState: state, // اضافه کردن وضعیت دیگر
      };
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    resetPagination(state) {
      state.data = [];
      state.skip = 0;
      state.take = 6;
      state.hasMore = true;
      state.error = null;
    },
    setTake(state, action: PayloadAction<number>) {
      state.take = action.payload;
    },
    updatePaginationData(state, action: PayloadAction<(data: any[]) => any[]>) {
      const updateFunction = action.payload;
      state.data = updateFunction(state.data);
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
        (state, action: PayloadAction<any>) => {
          const newData = action.payload.res || [];
          const anotherState = action.payload.anotherState;

          // پردازش داده‌ها
          const processedVideos = newData.map((video: any) => {
            const isFollowedFromMeTop =
              anotherState.main?.allFollingList?.getMapFollowingId?.some(
                (following: any) => following === video?.userInserted?.id
              );
            const isFollowedFromMeBott =
              anotherState.main?.allFollingList?.getMapFollowingId?.some(
                (following: any) => following === video?.userMatched?.id
              );

            return {
              ...video,
              urlTop: video?.attachmentInserted?.url,
              urlBott: video?.attachmentMatched?.url,
              profileTop: video?.profileInserted?.profileImage,
              profileBott: video?.profileMatched?.profileImage,
              isFollowedFromMeTop: isFollowedFromMeTop || false,
              isFollowedFromMeBott: isFollowedFromMeBott || false,
              likes: {
                [video?.attachmentInserted?.attachmentId]: {
                  isLiked: video.isLikedInserted || false,
                  count: video.likeInserted || 0,
                },
                [video?.attachmentMatched?.attachmentId]: {
                  isLiked: video.isLikedMatched || false,
                  count: video.likeMatched || 0,
                },
              },
              follows: {
                [video?.userInserted?.id]: {
                  isFollowed: isFollowedFromMeTop || false,
                },
                [video?.userMatched?.id]: {
                  isFollowed: isFollowedFromMeBott || false,
                },
              },
            };
          });

          // اضافه کردن داده‌های جدید به داده‌های قبلی
          state.data = [...state.data, ...processedVideos];
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

export const { resetPagination, setTake, updatePaginationData } =
  paginationSlice.actions;
export default paginationSlice.reducer;
