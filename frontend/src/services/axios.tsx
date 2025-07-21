import axios from "axios";
import { RsetMessageModal } from "../common/Slices/main";
import { store } from "../hooks/store";

axios.interceptors.request.use(
  function (config: any) {
    // const state = store.getState();
    // if (config.url.toLowerCase().includes("/addattachment")) {
    //   config.headers["Content-Type"] = "multipart/form-data";
    // } else if (config.url.toLowerCase().includes("/attachmentplay")) {
    //   config.headers["Content-Type"] = "video/mp4";
    // } else {
    //   config.headers["Content-Type"] = "application/json";
    // }
    if (config.url.toLowerCase().includes("/attachmentplay")) {
      console.log(config.url.toLowerCase().includes("/attachmentplay"));
      config.headers["Content-Type"] = "video/mp4";
    } else if (config.url.toLowerCase().includes("/addattachment")) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    config.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async function (response) {
    // بررسی وضعیت پاسخ و نمایش پیام‌های مربوطه
    if (
      !!response?.data?.code &&
      response?.data?.code !== 0 &&
      response?.data?.code !== 2 &&
      response?.data?.code !== 5 &&
      response?.data?.code !== 10 &&
      response?.data?.code !== 11
    ) {
      store.dispatch(
        RsetMessageModal({
          show: true,
          title: "Internal server error",
        })
      );
    }
    return response;
  },
  async function (error) {
    // بررسی کد وضعیت 401
    if (error.response?.status === 401) {
      store.dispatch(
        RsetMessageModal({
          show: true,
          title: error.response?.data?.message || "Unauthorized access",
        })
      );

      // پاکسازی اطلاعات کاربر از localStorage
      localStorage.clear();

      // هدایت به صفحه لاگین
      window.location.href = "/login"; // آدرس صفحه لاگین
      return Promise.reject(error);
    }

    // بررسی خطاهای دیگر (4xx)
    const expectedErrors =
      error.response &&
      error.response.status !== 401 &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (expectedErrors) {
      store.dispatch(
        RsetMessageModal({
          show: true,
          title: error.response?.data?.message || "Internal server error",
        })
      );
      return Promise.reject(error);
    }

    // مدیریت خطاهای غیرمنتظره
    store.dispatch(
      RsetMessageModal({
        show: true,
        title: error.response?.data?.message || "Internal server error",
      })
    );
    return Promise.reject(error);
  }
);
//   async function (error) {
//     const expectedErrors = error.response && error.response.status !== 401 && error.response.status >= 400 && error.response.status < 500
//     if (expectedErrors) {
//       setTimeout(() => {
//         window.location = "/login";
//         localStorage.clear();
//       }, 2000);
//       store.dispatch(
//         RsetMessageModal({
//           show: true,
//           title:
//             error.response.data.message || "Internal server error",
//         })
//       );
//       return error;
//     } else {
//       localStorage.clear();
//       return error;
//     }
//   }
// );
