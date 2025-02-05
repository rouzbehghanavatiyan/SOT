import { Router } from "express";
import chatRoom from "./chatRoom";
import loginData from "./loginData";
import group from "./group";
import categoryTest from "./categoryTest";

const getAllRouter = () => {
  const router = Router();

  router.use("/category", categoryTest);

  return router;
};

export default getAllRouter;
