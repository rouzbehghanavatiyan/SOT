import { Router } from "express";
import categoryTest from "./categoryTest";

const getAllRouter = () => {
  const router = Router();

  router.use("/category", categoryTest);

  return router;
};

export default getAllRouter;
