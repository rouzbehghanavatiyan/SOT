import { Router } from "express";
import {
  postToken,
  getTokenPep,
  getAllAdminChat,
} from "../../controller/loginData";

const router = Router();
router.post("/postToken", postToken);
router.get("/getAllAdminChat", getAllAdminChat);
router.get("/getTokenPep/:userId", getTokenPep);

export default router;
