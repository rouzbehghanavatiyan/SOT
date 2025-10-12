import axios from "axios";
import { RsetMessageModal } from "../common/Slices/main";
import { store } from "../hooks/store";

axios.interceptors.request.use(
  function (config: any) {
    const token = sessionStorage.getItem("token");
    console.log("VBBBBBBBBBBBBBBBBBBBBBBBBBBBB");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.url.toLowerCase().includes("/attachmentplay")) {
      config.headers["Content-Type"] = "video/mp4";
    } else if (config.url.toLowerCase().includes("/addattachment")) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async function (response) {
    const errorCodes = [0, 2, 5, 10, 11];
    if (!!response?.data?.code && !errorCodes.includes(response?.data?.code)) {
      store.dispatch(
        RsetMessageModal({
          show: true,
          title: "Internal server error",
          icon: "danger",
        })
      );
    }
    return response;
  },
  async function (error) {
    const status = error?.response?.status;

    if (status === 401) {
      store.dispatch(
        RsetMessageModal({
          show: true,
          title: error.response?.data?.message || "Unauthorized access",
          icon: "danger",
        })
      );

      console.log(error);
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
      return Promise.reject(error);
    }

    if (status >= 400 && status < 500) {
      store.dispatch(
        RsetMessageModal({
          show: true,
          title: error.response?.data?.message || "Client error",
          icon: "danger",
        })
      );
      return Promise.reject(error);
    }

    store.dispatch(
      RsetMessageModal({
        show: true,
        title: "An unexpected error occurred",
        icon: "danger",
      })
    );
    return Promise.reject(error);
  }
);
