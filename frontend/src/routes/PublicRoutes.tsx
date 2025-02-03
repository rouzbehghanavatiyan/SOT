import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Solo from "../common/TalentMode";
import PageNotFound from "../pages/PageNotFound";
import Layout from "../layout";
import Watch from "../pages/Watch";
import Cup from "../pages/Cup";
import Friendly from "../pages/Friendly";
import Live from "../pages/Live";
import Robot from "../pages/Robot";
import Store from "../pages/Store";
import Sot from "../pages/Sot";
import TalentMode from "../common/TalentMode";
import StepTwo from "../common/TalentMode/StepTwo";
import StepThree from "../common/TalentMode/StepThree";
import Notification from "../pages/Notification";
import Profile from "../pages/Profile";
import StepFour from "../common/TalentMode/StepFour";

const PublicRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/solo" element={<TalentMode />} />
        <Route path="/sot/:id" element={<StepTwo />} />
        <Route path="/sot/:id/:id" element={<StepThree />} />
        <Route path="/sot/:id/:id/:id" element={<StepFour />} />
        <Route path="/sot" element={<Sot />} />
        <Route path="/friendly" element={<Friendly />} />
        <Route path="/cup" element={<Cup />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/live" element={<Live />} />
        <Route path="/robot" element={<Robot />} />
        <Route path="/store" element={<Store />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
};

export default PublicRoutes;
