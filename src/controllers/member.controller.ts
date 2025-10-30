import { LoginInput, MemberInput } from "../libs/types/member";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import { Member } from "../libs/types/member";
import MemberService from "../models/Member.service";
import Errors, { HttpCode } from "../libs/errors";

const memberController: T = {};
const memberService = new MemberService();

memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup:");
    const input: MemberInput = req.body;
    const result: Member = await memberService.signup(input);

    res.status(HttpCode.OK).json({ member: result });
  } catch (err) {
    console.log("Error: signup", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login:");
    const input: LoginInput = req.body;
    const result = await memberService.login(input);

    res.status(HttpCode.OK).json({ member: result });
  } catch (err) {
    console.log("Error: login", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default memberController;
