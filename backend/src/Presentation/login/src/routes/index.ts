import express from "express";
import { login, dashboard, register } from "../controller/authControl";
import authorizationMidd from "../middleware/auth/auth";
const router = express.Router();

router.get("/dashboard", authorizationMidd, dashboard);
router.post("/login", login);
router.post("/sginUp", register);

export default router;
