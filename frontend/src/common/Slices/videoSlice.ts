import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  addAttachment,
  addInvite,
  addMovie,
  removeInvite,
} from "../../services/dotNet";

// --- Interfaces ---
interface VideoState {
  videoSrc: string | null;
  videoFile: File | null; // فایل اصلی را نگه می‌داریم
  isLoading: boolean;
  error: string | null;
  currentStep: number;
  uploadStatus: "idle" | "success" | "failed"; // وضعیت کلی آپلود
  movieData: {
    parentId: number | null;
    userId: number | null;
    movieId: number | null;
    status: number | null;
    inviteId: number | null;
    title: string;
    desc: string;
  };
  resMovieData: any;
}

const initialState: VideoState = {
  videoSrc: null,
  videoFile: null,
  isLoading: false,
  error: null,
  currentStep: 1,
  uploadStatus: "idle",
  resMovieData: null,
  movieData: {
    parentId: null,
    userId: null,
    movieId: null,
    status: null,
    inviteId: null,
    title: "",
    desc: "",
  },
};

export const prepareVideoFileThunk = createAsyncThunk(
  "video/prepareFile",
  async (file: File) => {
    const src = URL.createObjectURL(file);
    return { file, src };
  }
);

export const removeInviteThunk = createAsyncThunk(
  "video/removeInvite",
  async (inviteId: number) => {
    await removeInvite(inviteId);
    return inviteId;
  }
);

export const uploadFullProcessThunk = createAsyncThunk(
  "video/uploadFullProcess",
  async (
    { userId, gearId, mode, allFormData, socket, movieMeta }: any,
    { rejectWithValue }
  ) => {
    try {
      const postData = {
        userId,
        description: movieMeta?.desc ?? "",
        title: movieMeta?.title ?? "",
        subSubCategoryId: gearId || localStorage.getItem("gearId") || null,
        modeId: mode?.typeMode || null,
      };

      const movieRes = await addMovie(postData);
      console.log(movieRes);
      const movieDataRes = movieRes?.data?.data;

      if (movieRes?.data?.status !== 0) {
        throw new Error("Error in recording initial movie information");
      }

      let inviteData = null;
      if (mode?.typeMode === 3) {
        const formData = new FormData();
        if (allFormData?.video) formData.append("formFile", allFormData.video);
        if (allFormData?.imageCover)
          formData.append("formFile", allFormData.imageCover);

        formData.append("attachmentId", movieDataRes?.id);
        formData.append("attachmentType", "mo");
        formData.append("attachmentName", "movies");
        const attachRes = await addAttachment(formData);
        if (attachRes.data.status !== 0) {
          throw new Error("Error in recording initial movie information!");
        }

        const postInvite = {
          parentId: null,
          userId: userId || null,
          movieId: movieDataRes?.id || null,
          status: 0,
        };

        const inviteRes = await addInvite(postInvite);
        inviteData = inviteRes?.data?.data;
        console.log(inviteData);

        if (inviteData?.userId !== 0 && socket) {
          socket.emit("add_invite_offline", inviteData);
        }
      }

      return {
        modeType: mode?.typeMode,
        movieData: movieDataRes,
        inviteData: inviteData,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Upload failed");
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    resetVideoState: () => initialState,
    setMovieData: (state, action) => {
      state.movieData = { ...state.movieData, ...action.payload };
    },
    setMovieMeta: (state, action) => {
      state.movieData.title = action.payload.title ?? state.movieData.title;
      state.movieData.desc = action.payload.desc ?? state.movieData.desc;
      state.movieData.userId = action.payload.userId ?? state.movieData.userId;
    },
    goToStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(prepareVideoFileThunk.fulfilled, (state, action) => {
        state.videoFile = action.payload.file;
        state.videoSrc = action.payload.src;
      })

      .addCase(uploadFullProcessThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.uploadStatus = "idle";
      })
      .addCase(uploadFullProcessThunk.fulfilled, (state, action) => {
        state.uploadStatus = "success";
        console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVd");
        const { movieData, inviteData, modeType } = action.payload;
        
        state.resMovieData = movieData;
        state.movieData.movieId = movieData?.id;

        if (inviteData) {
          state.movieData.inviteId = inviteData.id;
        }

        if (modeType === 4) {
          state.currentStep = 3;
        }
      })
      .addCase(uploadFullProcessThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.uploadStatus = "failed";
        state.error = action.payload as string;
      })

      .addCase(removeInviteThunk.fulfilled, (state) => {
        state.movieData.inviteId = null;
      });
  },
});

export const { resetVideoState, setMovieData, setMovieMeta, goToStep } =
  videoSlice.actions;
export default videoSlice.reducer;

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import {
//   addAttachment,
//   addInvite,
//   addMovie,
//   removeInvite,
// } from "../../services/dotNet";

// // --- Interfaces ---
// interface VideoState {
//   videoSrc: string | null;
//   videoFile: File | null; // فایل اصلی را نگه می‌داریم
//   isLoading: boolean;
//   error: string | null;
//   currentStep: number;
//   uploadStatus: "idle" | "success" | "failed"; // وضعیت کلی آپلود
//   movieData: {
//     parentId: number | null;
//     userId: number | null;
//     movieId: number | null;
//     status: number | null;
//     inviteId: number | null;
//     title: string;
//     desc: string;
//   };
//   resMovieData: any;
// }

// const initialState: VideoState = {
//   videoSrc: null,
//   videoFile: null,
//   isLoading: false,
//   error: null,
//   currentStep: 1,
//   uploadStatus: "idle",
//   resMovieData: null,
//   movieData: {
//     parentId: null,
//     userId: null,
//     movieId: null,
//     status: null,
//     inviteId: null,
//     title: "",
//     desc: "",
//   },
// };

// export const prepareVideoFileThunk = createAsyncThunk(
//   "video/prepareFile",
//   async (file: File) => {
//     const src = URL.createObjectURL(file);
//     return { file, src };
//   }
// );

// export const removeInviteThunk = createAsyncThunk(
//   "video/removeInvite",
//   async (inviteId: number) => {
//     await removeInvite(inviteId);
//     return inviteId;
//   }
// );

// export const uploadFullProcessThunk = createAsyncThunk(
//   "video/uploadFullProcess",
//   async (
//     { userId, gearId, mode, allFormData, socket, movieMeta }: any,
//     { rejectWithValue, dispatch }
//   ) => {
//     try {
//       const postData = {
//         userId,
//         description: movieMeta?.desc ?? "",
//         title: movieMeta?.title ?? "",
//         subSubCategoryId: gearId || localStorage.getItem("gearId") || null,
//         modeId: mode?.typeMode || null,
//       };

//       const movieRes = await addMovie(postData);
//       console.log(movieRes);
//       const movieDataRes = movieRes?.data?.data;

//       if (movieRes?.data?.status !== 0) {
//         throw new Error("Error in recording initial movie information");
//       }

//       let inviteData = null;
//       if (mode?.typeMode === 3) {
//         const formData = new FormData();
//         if (allFormData?.video) formData.append("formFile", allFormData.video);
//         if (allFormData?.imageCover)
//           formData.append("formFile", allFormData.imageCover);

//         formData.append("attachmentId", movieDataRes?.id);
//         formData.append("attachmentType", "mo");
//         formData.append("attachmentName", "movies");
//         const attachRes = await addAttachment(formData);
//         if (attachRes.data.status !== 0) {
//           throw new Error("Error in recording initial movie information!");
//         }
//         const postInvite = {
//           parentId: null,
//           userId: userId || null,
//           movieId: movieDataRes?.id || null,
//           status: 0,
//         };

//         const inviteRes = await addInvite(postInvite);
//         dispatch(setLoadingManual(true));
//         inviteData = inviteRes?.data?.data;
//         if (inviteData?.userId !== 0 && socket) {
//           dispatch(setLoadingManual(false));
//           socket.emit("add_invite_offline", inviteData);
//         }
//       }

//       return {
//         modeType: mode?.typeMode,
//         movieData: movieDataRes,
//         inviteData: inviteData,
//       };
//     } catch (error: any) {
//       return rejectWithValue(error.message || "Upload failed");
//     }
//   }
// );

// const videoSlice = createSlice({
//   name: "video",
//   initialState,
//   reducers: {
//     resetVideoState: () => initialState,
//     setMovieData: (state, action) => {
//       state.movieData = { ...state.movieData, ...action.payload };
//     },
//     setMovieMeta: (state, action) => {
//       state.movieData.title = action.payload.title ?? state.movieData.title;
//       state.movieData.desc = action.payload.desc ?? state.movieData.desc;
//       state.movieData.userId = action.payload.userId ?? state.movieData.userId;
//     },
//     goToStep: (state, action: PayloadAction<number>) => {
//       state.currentStep = action.payload;
//     },
//     setLoadingManual: (state, action: PayloadAction<boolean>) => {
//       state.isLoading = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(prepareVideoFileThunk.fulfilled, (state, action) => {
//         state.videoFile = action.payload.file;
//         state.videoSrc = action.payload.src;
//       })

//       .addCase(uploadFullProcessThunk.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         state.uploadStatus = "idle";
//       })
//       .addCase(uploadFullProcessThunk.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.uploadStatus = "success";

//         const { movieData, inviteData, modeType } = action.payload;

//         state.resMovieData = movieData;
//         state.movieData.movieId = movieData?.id;

//         if (inviteData) {
//           state.movieData.inviteId = inviteData.id;
//         }

//         if (modeType === 4) {
//           state.currentStep = 3;
//         }
//       })
//       .addCase(uploadFullProcessThunk.rejected, (state, action) => {
//         state.isLoading = false;
//         state.uploadStatus = "failed";
//         state.error = action.payload as string;
//       })

//       .addCase(removeInviteThunk.fulfilled, (state) => {
//         state.movieData.inviteId = null;
//       });
//   },
// });

// export const {
//   setLoadingManual,
//   resetVideoState,
//   setMovieData,
//   setMovieMeta,
//   goToStep,
// } = videoSlice.actions;
// export default videoSlice.reducer;
