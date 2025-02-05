import "./services/axios";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import Login from "./pages/Login";
import SignUpForm from "./pages/SignUp";
import EditVideo from "./components/EditVideo";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/editVideos" element={<EditVideo />} />
      <Route path="/" element={<Login />} />
      <Route path="/signUp" element={<SignUpForm />} />
    </Routes>
  );
}

export default App;
