import axios from "axios";
import { RsetMessageModal } from "../common/Slices/main";
import { store } from "../hooks/store";

axios.interceptors.request.use(
  function (config: any) {
    const state = store.getState();
    // if (config.url.toLowerCase().includes("/addattachment")) {
    //   config.headers["Content-Type"] = "multipart/form-data";
    // } else if (config.url.toLowerCase().includes("/attachmentplay")) {
    //   config.headers["Content-Type"] = "video/mp4";
    // } else {
    //   config.headers["Content-Type"] = "application/json";
    // }
    console.log(config.url.toLowerCase());

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
    // if (!!response?.headers?.authorization) {
    //     console.log(!!response?.headers?.authorization, "This is set token");
    //     const fixTokenId = response?.headers?.authorization?.split(" ")?.[1]
    //     localStorage?.setItem("token", fixTokenId)
    // }

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
          title: "مشکلی در سرور به وجود آمده است.",
        })
      );
    }
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      store.dispatch(
        RsetMessageModal({
          show: true,
          title:
            error.response.data.message || "مشکلی در سرور به وجود آمده است.",
        })
      );
      localStorage.clear();
      //   window.location = "/login";
    }
    try {
      const expectedErrors =
        error.response &&
        error.response.status !== 401 &&
        error.response.status >= 400 &&
        error.response.status < 500;

      if (expectedErrors) {
        store.dispatch(
          RsetMessageModal({
            show: true,
            title:
              error.response.data.message || "مشکلی در سرور به وجود آمده است.",
          })
        );
        return;
      }
    } catch (error: any) {
      const { message }: any = error;
      // Do something with response error
      store.dispatch(
        RsetMessageModal({
          show: true,
          title:
            error.response.data.message || "مشکلی در سرور به وجود آمده است.",
        })
      );
      return Promise.reject(message);
    }
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
//             error.response.data.message || "مشکلی در سرور به وجود آمده است.",
//         })
//       );
//       return error;
//     } else {
//       localStorage.clear();
//       return error;
//     }
//   }
// );
