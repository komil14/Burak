import express from "express";
import memberController from "./controllers/member.controller";
const router = express.Router();

router.post("/member/signup", memberController.signup);
router.post("/member/login", memberController.login);

export default router;
