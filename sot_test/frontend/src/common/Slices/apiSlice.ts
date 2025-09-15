import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "/api",
//     prepareHeaders: (headers) => {
//       // اضافه کردن هدرهای لازم مثل توکن احراز هویت
//       const token = localStorage.getItem("token");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["Attachments", "FollowerAttachments", "User"],
//   endpoints: (builder) => ({
//     // دریافت لیست attachmentها
//     getAttachmentList: builder.query({
//       query: ({ skip, take }) => `/attachmentList?skip=${skip}&take=${take}`,
//       providesTags: (result) =>
//         result
//           ? result.data.map(({ id }: any) => ({ type: "Attachments", id }))
//           : ["Attachments"],
//     }),

//     // دریافت attachmentها بر اساس inviteId
//     getAttachmentListByInviteId: builder.query({
//       query: (id) => `/attachmentListByInviteId?inviteId=${id}`,
//       providesTags: (result, error, id) => [{ type: "Attachments", id }],
//     }),

//     // دریافت attachmentهای فالوورها
//     getFollowerAttachments: builder.query({
//       query: (userId) => `/users/${userId}/follower-attachments`,
//       providesTags: ["FollowerAttachments"],
//     }),

//     // دریافت پروفایل کاربر
//     getUserProfile: builder.query({
//       query: (userId) => `/users/${userId}`,
//       providesTags: (result, error, userId) => [{ type: "User", id: userId }],
//     }),
//   }),
// });

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Attachments", "FollowerAttachments", "User", "Videos"],
  endpoints: (builder) => ({
    getUserAttachmentList: builder.query({
      query: (userId) =>
        `http://10.0.10.48:8085/userAttachmentList?userId=${userId}`,
      providesTags: (result, error, userId) => [{ type: "Videos", id: userId }],
      keepUnusedDataFor: 3600,
      refetchOnMountOrArgChange: false,
    }),
  }),
});

export const {
  //   useGetAttachmentListQuery,
  //   useGetAttachmentListByInviteIdQuery,
  //   useGetFollowerAttachmentsQuery,
  //   useGetUserProfileQuery,
  useGetUserAttachmentListQuery,
} = apiSlice;
