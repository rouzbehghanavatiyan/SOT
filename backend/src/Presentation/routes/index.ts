import { Router } from "express";
import offLine from "./offLine";
import likeRoutes from "./likeRoutes";

const getAllRouter = () => {
  const router = Router();

  router.use("/offLine", offLine);
  router.use("/like", likeRoutes);

  return router;
};

export default getAllRouter;
