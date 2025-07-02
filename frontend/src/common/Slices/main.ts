import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeCategories } from "./mainType";
import { categoryList } from "../../services/dotNet";

type MessageModal = {
  title?: string;
  show?: boolean;
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
  messageModal: MessageModal;
  showToast: ToastifyType;
  showQuestionModal: ShowQuestion;
  showLoading?: { btnName?: string | number; value?: boolean };
  showLoadingBtn?: string;
  loading: boolean;
  dobuleVideo: null;
  category: any;
  socketConfig: any;
  userLogin: any;
  userOnlines: any;
  profileImage: any;
  allFollowerList: any;
}
const initialState: MainType = {
  messageModal: { title: "", show: false },
  showToast: { title: "", bg: "", show: false },
  loading: false,
  showQuestionModal: { show: false, answer: false },
  showLoading: { btnName: "", value: false },
  showLoadingBtn: "",
  dobuleVideo: null,
  category: [],
  socketConfig: null,
  userLogin: {},
  userOnlines: null,
  profileImage: null,
  allFollowerList: [],
};

// -> handle get user menu list
export const handleCategories = createAsyncThunk(
  "main/handleCategories",
  async (data: TypeCategories, { dispatch, getState }: any) => {
    const postData: TypeCategories = {};
    console.log(data);
    // dispatch(RsetShowLoading({ value: true, btnName: data?.loadingName }));
    const resBuyerPersonList = await categoryList(data?.id);
    // dispatch(RsetShowLoading({ value: false, btnName: "" }));
    if (resBuyerPersonList.data.code === 0) {
      dispatch(RsetPersonBuyerList(resBuyerPersonList?.data?.result));
    } else {
      dispatch(
        RsetShowToast({
          show: true,
          title: resBuyerPersonList?.data?.message,
          bg: "danger",
        })
      );
    }
  }
);

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    RsetMessageModal: (state, actions: PayloadAction<MessageModal>) => {
      return { ...state, messageModal: actions.payload };
    },
    RsetUserLogin: (state, actions: PayloadAction<any>) => {
      return { ...state, userLogin: actions.payload };
    },
    RsetLoading: (
      state,
      actions: PayloadAction<{ btnName?: string | number; value?: boolean }>
    ) => {
      return { ...state, showLoading: actions.payload };
    },
    RsetDobuleVideo: (state, actions: PayloadAction<any>) => {
      return { ...state, dobuleVideo: actions.payload };
    },
    RsetCategory: (state, actions: PayloadAction<any>) => {
      return { ...state, category: actions.payload };
    },
    RsetProgress: (state, actions: PayloadAction<any>) => {
      return { ...state, progress: actions.payload };
    },
    RsetSocketConfig: (state, actions: PayloadAction<any>) => {
      return { ...state, socketConfig: actions.payload };
    },
    RsetGiveUserOnlines: (state, actions: PayloadAction<any>) => {
      return { ...state, userOnlines: actions.payload };
    },
    RsetGetImageProfile: (state, actions: PayloadAction<any>) => {
      return { ...state, profileImage: actions.payload };
    },
    RsetAllFollowerList: (state, actions: PayloadAction<any>) => {
      return { ...state, allFollowerList: actions.payload };
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(
  //         handleGetUserMenuList.fulfilled,
  //         (state, action: PayloadAction<any>) => {
  //           try {
  //             if (action.payload.code === 0) {
  //               const filterMenu = action?.payload?.result?.sort(
  //                 (a: any, b: any) => a.priority - b.priority
  //               );
  //               return { ...state, userMenu: filterMenu };
  //             }
  //           } catch (error) {
  //             console.log(error);
  //             throw Error;
  //           }
  //         }
  //       )
  //       .addCase(
  //         handleUpdateAccount.fulfilled,
  //         (state, action: PayloadAction<any>) => {
  //           // if (action.payload.code === 0) {
  //           // }
  //           // return {}
  //         }
  //       );
  //   },
});

export const {
  RsetMessageModal,
  RsetLoading,
  RsetDobuleVideo,
  RsetCategory,
  RsetSocketConfig,
  RsetProgress,
  RsetUserLogin,
  RsetAllFollowerList,
  RsetGiveUserOnlines,
  RsetGetImageProfile,
} = mainSlice.actions;
export default mainSlice.reducer;
