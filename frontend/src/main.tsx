import App from "./App.tsx";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { store } from "./hooks/store.ts";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  // </StrictMode>
),
  {
    FORCE_BODY: true,
    SANITIZE_NAMED_PROPS: true,
  };

// const root = ReactDOM.createRoot(document.getElementById('root'));
// DOMPurify.sanitize(
//   root.render(
//     <React.StrictMode>
//       <BrowserRouter>
//           <App />
//         </Provider>
//       </BrowserRouter>
//     </React.StrictMode>
//   ),
//   {
//     FORCE_BODY: true,
//     SANITIZE_NAMED_PROPS: true,
//   }
// );

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
