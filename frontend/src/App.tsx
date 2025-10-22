import "./services/axios";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import Login from "./pages/Login";
import SignUpForm from "./pages/SignUp";
import LearningSot from "./pages/LearningSot";
import ServerError from "./pages/ServerError";
const publicKey: string | undefined = import.meta.env.VITE_PUBLIC_KEY;

function App() {
  const handleSubscribe = async () => {
    try {
      const permission = await Notification.requestPermission();
      console.log("Permission status:", permission);

      if (permission === "granted") {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: publicKey, // کلید عمومی VAPID خود را اینجا قرار دهید
        });
        console.log("Push subscription:", subscription);
      }
    } catch (error) {
      console.error("Error enabling notifications:", error);
    }
  };

  return (
    <>
      {/* <div className="notification-container">
        <button onClick={handleSubscribe} className="enable-notifications-btn">
          Enable Notifications
        </button>
      </div> */}
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/" element={<Login />} />
        <Route path="/learningSot" element={<LearningSot />} />
        <Route path="/server-error" element={<ServerError />} />
        <Route path="/signUp" element={<SignUpForm />} />
      </Routes>
    </>
  );
}

export default App;
