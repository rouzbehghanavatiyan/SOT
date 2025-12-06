import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  attachmentListByInviteId,
  followerAttachmentList,
} from "../../services/dotNet";

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
  followers?: any;
  createTalent: any;
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
  likeFollow: any;
  showWatchPagination: any;
}

const initialState: MainType = {
  lastMatch: [],
  createTalent: {},
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
  likeFollow: [],
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

export const handleAttachmentListByInviteId = createAsyncThunk(
  "main/handleAttachmentListByInviteId",
  async (data: any, { rejectWithValue, getState, dispatch }) => {
    const postData = {
      skip: data?.skip,
      take: data?.take,
      inviteId: data?.inviteId,
    };
    try {
      return await attachmentListByInviteId(postData);
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
  async (data: any, { rejectWithValue, getState, dispatch }) => {
    const postData = {
      skip: data?.skip,
      take: data?.take,
      inviteId: data?.inviteId,
    };
    try {
      dispatch(RsetLoading({ value: true }));
      const response = await followerAttachmentList(postData);
      dispatch(RsetLoading({ value: false }));
      return response;
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

    RsetCreateTalent: (state, action: PayloadAction<any>) => {
      state.createTalent = action.payload;
    },
    RsetCategory: (state, action: PayloadAction<any[]>) => {
      state.category = action.payload;
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
      if (Array.isArray(action.payload)) {
        state.homeMatch.data = [...state.homeMatch.data, ...action.payload];
      }
    },
    setPaginationHomeMatch: (
      state,
      action: PayloadAction<{ take: number; skip: number; hasMore: boolean }>
    ) => {
      state.homeMatch.pagination = action.payload;
    },
    RsetLikeFollow: (state, action: PayloadAction<any>) => {
      state.likeFollow = [...state.likeFollow, ...action.payload];
    },
    RsetShowWatch: (state: any, action: PayloadAction<any>) => {
      if (Array.isArray(action.payload)) {
        state.showWatchMatch.data = [
          ...state.showWatchMatch.data,
          ...action.payload,
        ];
      }
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
    resetWatchVideo: (state) => {
      state.watchVideo = {
        pagination: {
          take: 6,
          skip: 0,
          hasMore: true,
        },
        data: [],
      };
    },
    updateLikeStatus: (
      state,
      action: PayloadAction<{
        movieId: string;
        isLiked: boolean;
        positionVideo?: number;
      }>
    ) => {
      const { movieId, isLiked, positionVideo } = action.payload;

      state.showWatchMatch.data = state.showWatchMatch.data.map(
        (video: any) => {
          const videoCopy = { ...video };

          if (!videoCopy.likes) {
            videoCopy.likes = {};
          }

          if (!videoCopy.likes[movieId]) {
            videoCopy.likes[movieId] = { isLiked: false, count: 0 };
          }
          videoCopy.likes[movieId] = {
            ...videoCopy.likes[movieId],
            isLiked: isLiked,
          };

          return videoCopy;
        }
      );
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
          state.allLoginMatch = action.payload;
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
          state.allLoginMatch = action.payload;
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
  RsetCreateTalent,
  RsetLoading,
  RsetCategory,
  RsetSocketConfig,
  RsetUserLogin,
  RsetAllFollowerList,
  RsetAllFollingList,
  RsetGiveUserOnlines,
  RsetGetImageProfile,
  RsetLikeFollow,
  resetShowWatchState,
  RsetShowWatch,
  setPaginationShowWatch,
  setPaginationWatch,
  RsetWatchVideo,
  resetWatchVideo,
  RsetHomeMatch,
  setPaginationHomeMatch,
  RsetLastMatch,
  updateLikeStatus,
} = mainSlice.actions;

export default mainSlice.reducer;
