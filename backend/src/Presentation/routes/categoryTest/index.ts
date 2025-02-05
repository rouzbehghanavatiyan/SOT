import { Router } from "express";
import { categoryTestController } from "../../controller/categoryTestController";

const router = Router();

router.get("/categoryPost", categoryTestController);

export default router;