import App from "./App.tsx";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { store } from "./hooks/store.ts";
import NotificationAlert from "./components/NotificationAlert.tsx";
import ChatAlert from "./components/ChatAlert.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter basename={process.env.VITE_URL}>
    <Provider store={store}>
      <App />
      <NotificationAlert />
      <ChatAlert />
    </Provider>
  </BrowserRouter>
),
  {
    FORCE_BODY: true,
    SANITIZE_NAMED_PROPS: true,
  };

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then()
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
