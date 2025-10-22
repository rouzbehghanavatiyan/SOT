import axios from "axios";
import { RsetMessageModal } from "../common/Slices/main";
import { store } from "../hooks/store";

axios.interceptors.request.use(
  function (config: any) {
    const token = sessionStorage.getItem("token");

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
    const isNetworkError = error?.code === 'ERR_NETWORK' || error?.message === 'Network Error';
    const isCorsError = error?.code === 'ERR_NETWORK' || error?.message?.includes('CORS');
    
    console.log('API Error:', error);

    // Handle Network Error & CORS Error
    if (isNetworkError || isCorsError) {
      // Save error info to sessionStorage for error page
      sessionStorage.setItem('serverError', JSON.stringify({
        type: 'server',
        timestamp: new Date().toISOString(),
        message: 'Network or CORS error occurred'
      }));

      // Clear storage and redirect to server error page
      localStorage.clear();
      sessionStorage.removeItem('token'); // Only remove token, keep error info
      
      // Redirect immediately to server error page
      window.location.href = "/server-error";
      
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized
    if (status === 401) {
      store.dispatch(
        RsetMessageModal({
          show: true,
          title: error.response?.data?.message || "Your session has expired. Please login again.",
          icon: "danger",
        })
      );

      localStorage.clear();
      sessionStorage.clear();
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      
      return Promise.reject(error);
    }

    // Handle other client errors (4xx)
    if (status >= 400 && status < 500) {
      store.dispatch(
        RsetMessageModal({
          show: true,
          title: error.response?.data?.message || "Client error occurred",
          icon: "danger",
        })
      );
      return Promise.reject(error);
    }

    // Handle server errors (5xx)
    if (status >= 500) {
      sessionStorage.setItem('serverError', JSON.stringify({
        type: 'server',
        timestamp: new Date().toISOString(),
        message: 'Server error occurred'
      }));
      
      window.location.href = "/server-error";
      return Promise.reject(error);
    }

    // Handle other errors
    store.dispatch(
      RsetMessageModal({
        show: true,
        title: "An unexpected error occurred. Please try again.",
        icon: "danger",
      })
    );
    
    return Promise.reject(error);
  }
);