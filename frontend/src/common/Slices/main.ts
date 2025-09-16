import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  attachmentListByInviteId,
  categoryList,
  followerAttachmentList,
} from "../../services/dotNet";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./apiSlice";

type MessageModal = {
  title?: string;
  show?: boolean;
  icon?: string;
};

type ToastifyType = {
  title?: string;
  bg?: string;
  show?: boolean;
};

interface ShowQuestion {
  answer?: boolean;
  show?: boolean;
}

interface MainType {
  messageModal?: MessageModal;
  showToast: ToastifyType;
  showQuestionModal: ShowQuestion;
  showLoading?: { btnName?: string | number; value?: boolean };
  showLoadingBtn?: string;
  loading: boolean;
  tornoment: any[];
  category: any[];
  socketConfig: any;
  userLogin: any;
  userOnlines: any;
  profileImage: any;
  allFollowerList: any[];
  allFollingList: any;
  allTornoment: any[];
  progress?: any;
  allLoginMatch?: any[];
  loginMatch?: any[];
  lastMatch?: any[];
  watchVideo?: any;
  homeMatch?: any;
  showWatchMatch?: any;
  selectedInviteId: any;
  videos: any;
}

const initialState: MainType = {
  lastMatch: [],
  videos: [],
  messageModal: { title: "", show: false, icon: "" },
  showToast: { title: "", bg: "", show: false },
  loading: false,
  showQuestionModal: { show: false, answer: false },
  showLoading: { btnName: "", value: false },
  showLoadingBtn: "",
  tornoment: [],
  allTornoment: [],
  category: [],
  socketConfig: null,
  userLogin: {},
  userOnlines: null,
  profileImage: null,
  allFollowerList: [],
  allFollingList: {},
  allLoginMatch: [],
  loginMatch: [],
  selectedInviteId: null,
  watchVideo: {
    pagination: {
      take: 6,
      skip: 0,
      hasMore: true,
    },
    data: [],
  },
  homeMatch: {
    pagination: {
      take: 6,
      skip: 0,
      hasMore: true,
    },
    data: [],
  },
  showWatchMatch: {
    pagination: {
      take: 6,
      skip: 0,
      hasMore: true,
    },
    data: [],
  },
};

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMainAttachments: builder.query({
      query: (inviteId) => `/main/attachments/${inviteId}`,
      providesTags: (result, error, inviteId) => [
        { type: "Attachments", id: inviteId },
      ],
    }),
  }),
});

export const handleAttachmentListByInviteId = createAsyncThunk(
  "main/handleAttachmentListByInviteId",
  async (data: any, { rejectWithValue, getState, dispatch }) => {
    const postData = {
      skip: data?.skip,
      take: data?.take,
      inviteId: data?.inviteId,
    };
    try {
      const response = await attachmentListByInviteId(postData);
      return {
        getData: response,
        state: getState(),
      };
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const handleFollowerAttachmentList = createAsyncThunk(
  "main/handleFollowerAttachmentList",
  async (userIdLogin: number, { rejectWithValue, getState, dispatch }) => {
    try {
      dispatch(RsetLoading({ value: true }));
      const response = await followerAttachmentList(userIdLogin, 0, 6);
      dispatch(RsetLoading({ value: false }));
      return {
        getData: response,
        state: getState(),
      };
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    RsetMessageModal: (state, action: PayloadAction<MessageModal>) => {
      state.messageModal = action.payload;
    },
    RsetUserLogin: (state, action: PayloadAction<any>) => {
      // state.userLogin = { ...state.userLogin, ...action.payload };
      state.userLogin = action.payload;
    },
    RsetLoading: (
      state,
      action: PayloadAction<{ btnName?: string | number; value?: boolean }>
    ) => {
      state.showLoading = action.payload;
    },
    RsetTornoment: (state, action: PayloadAction<(videos: any[]) => any[]>) => {
      state.tornoment = action.payload(state.tornoment);
    },
    // RsetAllLoginMatch: (state, action: PayloadAction<any>) => {
    //   const updatedTornoment = action.payload(state.allLoginMatch);
    //   console.log(updatedTornoment);

    //   state.allLoginMatch = updatedTornoment;
    // },
    RsetCategory: (state, action: PayloadAction<any[]>) => {
      state.category = action.payload;
    },
    RsetProgress: (state, action: PayloadAction<any>) => {
      state.progress = action.payload;
    },
    RsetSocketConfig: (state, action: PayloadAction<any>) => {
      state.socketConfig = action.payload;
    },
    RsetGiveUserOnlines: (state, action: PayloadAction<any>) => {
      state.userOnlines = action.payload;
    },
    RsetGetImageProfile: (state, action: PayloadAction<any>) => {
      state.profileImage = action.payload;
    },
    RsetAllFollowerList: (state, action: PayloadAction<any[]>) => {
      state.allFollowerList = action.payload;
    },
    RsetAllFollingList: (state, action: PayloadAction<any[]>) => {
      state.allFollingList = action.payload;
    },
    RsetLastMatch: (state, action: PayloadAction<any[]>) => {
      state.lastMatch = action.payload;
    },
    setVideos(state, action: PayloadAction<any[]>) {
      state.videos = action.payload;
    },
    RsetAppendVideos(state, action: PayloadAction<any[]>) {
      state.videos = [...state.videos, ...action.payload];
    },
    RsetWatchVideo: (state, action: PayloadAction<any[]>) => {
      state.watchVideo.data = [...state.watchVideo.data, ...action.payload];
    },
    setPaginationWatch: (
      state,
      action: PayloadAction<{ take: number; skip: number; hasMore: boolean }>
    ) => {
      state.watchVideo.pagination = action.payload;
    },
    RsetHomeMatch: (state, action: PayloadAction<any[]>) => {
      state.homeMatch.data = [...state.homeMatch.data, ...action.payload];
    },
    setPaginationHomeMatch: (
      state,
      action: PayloadAction<{ take: number; skip: number; hasMore: boolean }>
    ) => {
      state.homeMatch.pagination = action.payload;
    },
    RsetShowWatch: (state, action: PayloadAction<any[]>) => {
      console.log(action);
      const processedVideos = action?.payload?.map((video: any) => {
        const isFollowedFromMeTop =
          state?.allFollingList?.getMapFollowingId?.some(
            (following: any) => following === video?.userInserted?.id
          );
        const isFollowedFromMeBott =
          state?.allFollingList?.getMapFollowingId?.some(
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

      state.showWatchMatch.data = [
        ...state.showWatchMatch.data,
        ...processedVideos, // استفاده از processedVideos به جای action.payload
      ];
    },
    setPaginationShowWatch: (
      state,
      action: PayloadAction<{ take: number; skip: number; hasMore: boolean }>
    ) => {
      state.showWatchMatch.pagination = action.payload;
    },
    resetShowWatchState: (state) => {
      state.showWatchMatch = {
        pagination: {
          take: 6,
          skip: 0,
          hasMore: true,
        },
        data: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleAttachmentListByInviteId.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        handleAttachmentListByInviteId.fulfilled,
        (state, action: PayloadAction<any>) => {
          const { status, data } = action?.payload.getData?.data;
          const hasMore = data.length > 0;
          const getAllStateMain = action?.payload?.state?.main;
          if (status === 0) {
            const processedVideos = data.map((video: any) => {
              const isFollowedFromMeTop =
                getAllStateMain?.allFollingList?.getMapFollowingId?.some(
                  (following: any) => following === video?.userInserted?.id
                );

              const isFollowedFromMeBott =
                getAllStateMain?.allFollingList?.getMapFollowingId?.some(
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

            // state.tornoment = processedVideos;
            state.allLoginMatch = processedVideos;
            // state.allTornoment = data;
          }
        }
      )
      .addCase(handleAttachmentListByInviteId.rejected, (state, action) => {
        state.loading = false;
        console.error("Error fetching attachments:", action.payload);
      })
      .addCase(handleFollowerAttachmentList.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        handleFollowerAttachmentList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          const { status, data } = action?.payload?.getData?.data;
          const getAllStateMain = action?.payload?.state?.main;
          const processedVideos = data?.map((video: any) => {
            const isFollowedFromMeTop =
              getAllStateMain?.allFollingList?.getMapFollowingId?.some(
                (following: any) => following === video?.userInserted?.id
              );
            const isFollowedFromMeBott =
              getAllStateMain?.allFollingList?.getMapFollowingId?.some(
                (following: any) => following === video?.userMatched?.id
              );
            return {
              ...video,
              isFollowedFromMeTop: isFollowedFromMeTop || false,
              isFollowedFromMeBott: isFollowedFromMeBott || false,
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

          if (status === 0) {
            state.allLoginMatch = processedVideos;
            // state.loginMatch = data;
          }
        }
      )
      .addCase(handleFollowerAttachmentList.rejected, (state, action) => {
        state.loading = false;
        console.error("Error fetching follower attachments:", action.payload);
      });
  },
});

export const {
  RsetMessageModal,
  RsetLoading,
  RsetTornoment,
  RsetCategory,
  RsetSocketConfig,
  RsetProgress,
  RsetUserLogin,
  RsetAllFollowerList,
  RsetAllFollingList,
  RsetGiveUserOnlines,
  RsetGetImageProfile,
  // RsetAllLoginMatch,
  resetShowWatchState,
  RsetShowWatch,
  setPaginationShowWatch,
  setPaginationWatch,
  RsetWatchVideo,
  RsetHomeMatch,
  setPaginationHomeMatch,
  RsetLastMatch,
  RsetAppendVideos,
} = mainSlice.actions;

export const { useGetMainAttachmentsQuery } = extendedApiSlice;
export default mainSlice.reducer;
