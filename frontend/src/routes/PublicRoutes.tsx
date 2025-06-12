import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
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
import ShowWatch from "../pages/Watch/ShowWatch";
import Setting from "../pages/Setting";
import ChatRoom from "../pages/ChatRoom";
import LearningSot from "../pages/LearningSot";

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
        <Route path="/watch/show" element={<ShowWatch />} />
        <Route path="/friendly" element={<Friendly />} />
        <Route path="/cup" element={<Cup />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/learn" element={<LearningSot />} />
        <Route path="/live" element={<Live />} />
        <Route path="/robot" element={<Robot />} />
        <Route path="/store" element={<Store />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/messages" element={<ChatRoom />} />
        {/* <Route path="/messages" element={<Setting />} /> */}
      </Routes>
    </Layout>
  );
};

export default PublicRoutes;
