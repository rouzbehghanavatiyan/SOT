import { Router } from "express";
import { addOffline } from "../../controller/offlineController";

const router = Router();

router.post("/addOffline", addOffline);

export default router;
