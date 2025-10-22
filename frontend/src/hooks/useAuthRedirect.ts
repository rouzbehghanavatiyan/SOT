import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNetworkError = () => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login", {
        state: {
          error: "Network connection failed. Please login again.",
        },
      });
    };

    window.addEventListener("online", () => console.log("Connection restored"));
    window.addEventListener("offline", handleNetworkError);

    return () => {
      window.removeEventListener("online", () => {});
      window.removeEventListener("offline", handleNetworkError);
    };
  }, [navigate]);
};
