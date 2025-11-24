import express from "express";
import memberController from "./controllers/member.controller";
const router = express.Router();

/* MEMBERS */
router
  .post("/member/signup", memberController.signup)
  .post("/member/login", memberController.login)
  .post("/member/logout", memberController.verifyAuth, memberController.logout)
  .get(
    "/member/detail",
    memberController.verifyAuth,
    memberController.getMemberDetail
  );
export default router;
