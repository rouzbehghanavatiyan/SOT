import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import Login from "./pages/Login";
import SignUpForm from "./pages/SignUp";

function App() {
  return (
    <>
      <div className=" mx-auto w-100 m-0 p-0 d-flex flex-column min-vh-100 position-relative">
        <Routes>
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUpForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
