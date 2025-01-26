import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Solo from "../pages/Solo";
import PageNotFound from "../pages/PageNotFound";
import Layout from "../layout";
import Watch from "../pages/Watch";
import Cup from "../pages/Cup";
import Friendly from "../pages/Friendly";
import Live from "../pages/Live";
import Robot from "../pages/Robot";
import Store from "../pages/Store";
import Sot from "../pages/Sot";
import StepTwo from "../common/SoloTalent/StepTwo";
import StepThree from "../common/SoloTalent/StepThree";

const PublicRoutes = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/solo/:id" element={<StepTwo />} />
          <Route path="/solo/:id/:id" element={<StepThree />} />
          <Route path="/solo" element={<Solo />} />
          <Route path="/sot" element={<Sot />} />
          <Route path="/friendly" element={<Friendly />} />
          <Route path="/cup" element={<Cup />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/live" element={<Live />} />
          <Route path="/robot" element={<Robot />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </Layout>
    </>
  );
};

export default PublicRoutes;
