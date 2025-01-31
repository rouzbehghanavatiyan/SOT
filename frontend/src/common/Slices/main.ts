import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}
const initialState: MainType = {
  messageModal: { title: "", show: false },
  showToast: { title: "", bg: "", show: false },
  loading: false,
  showQuestionModal: { show: false, answer: false },
  showLoading: { btnName: "", value: false },
  showLoadingBtn: "",
};
// -> handle get user menu list
// export const handleGetUserMenuList: any = createAsyncThunk(
//   "main/handleGetUserMenuList",
//   async (obj: any, { dispatch, getState }) => {
//     try {
//       // dispatch(RsetShowLoading(true))
//       if (resUserMenuList?.data?.code === 0) {
//         return resUserMenuList.data;
//       } else {
//         dispatch(RsetShowLoading({ value: false }));
//       }
//     } catch (error) {
//       console.log(error);
//       throw Error;
//     }
//   }
// );

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    RsetMessageModal: (state, actions: PayloadAction<MessageModal>) => {
      return { ...state, messageModal: actions.payload };
    },
    RsetLoading: (
      state,
      actions: PayloadAction<{ btnName?: string | number; value?: boolean }>
    ) => {
      return { ...state, showLoading: actions.payload };
    },
    RsetShowToast: (state, actions: PayloadAction<ToastifyType>) => {
      return { ...state, showToast: actions.payload };
    },
    RsetShowModal: (state, actions: PayloadAction<MessageModal>) => {
      return { ...state, showModal: actions.payload };
    },
    RsetQuestionModal: (state, actions: PayloadAction<ShowQuestion>) => {
      return { ...state, showQuestionModal: actions.payload };
    },
    RsetShowLoadingBtn: (state, actions: PayloadAction<string>) => {
      return { ...state, showLoadingBtn: actions.payload };
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

export const { RsetMessageModal, RsetLoading } = mainSlice.actions;
export default mainSlice.reducer;
