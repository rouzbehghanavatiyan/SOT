import axios from "axios";
import { RsetMessageModal } from "../common/Slices/main";
import { store } from "../hooks/store";

axios.interceptors.request.use(
  function (config: any) {
    // تنظیم نوع محتوا بر اساس URL
    if (config.url.toLowerCase().includes("/attachmentplay")) {
      config.headers["Content-Type"] = "video/mp4";
    } else if (config.url.toLowerCase().includes("/addattachment")) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    // اضافه کردن توکن به هدر
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // مدیریت خطاهای درخواست
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async function (response) {
    // بررسی وضعیت پاسخ و نمایش پیام‌های مربوطه
    const errorCodes = [0, 2, 5, 10, 11];
    if (!!response?.data?.code && !errorCodes.includes(response?.data?.code)) {
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
    // بررسی وضعیت خطا
    const status = error?.response?.status;

    // مدیریت خطای 401 (Unauthorized)
    if (status === 401) {
      store.dispatch(
        RsetMessageModal({
          show: true,
          title: error.response?.data?.message || "Unauthorized access",
        })
      );

      // پاک کردن اطلاعات کاربر و هدایت به صفحه لاگین
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/"; // استفاده از window.location.href به جای Navigate
      return Promise.reject(error);
    }

    // مدیریت سایر خطاهای 4xx
    if (status >= 400 && status < 500) {
      store.dispatch(
        RsetMessageModal({
          show: true,
          title: error.response?.data?.message || "Client error",
        })
      );
      return Promise.reject(error);
    }

    // مدیریت خطاهای دیگر
    store.dispatch(
      RsetMessageModal({
        show: true,
        title: "An unexpected error occurred",
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
