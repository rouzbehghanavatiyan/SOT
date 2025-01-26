import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import Login from "./pages/Login";
import SignUpForm from "./pages/SignUp";
import "./services/axios";

function App() {
  console.log("BHHHHHHHBBBBBBBBBBBBB");
  
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/" element={<Login />} />
      <Route path="/signUp" element={<SignUpForm />} />
    </Routes>
  );
}

export default App;
