import { T } from "../libs/types/common";
import { NextFunction, Request, Response } from "express";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/errors";

const restaurantController: T = {};
const memberService = new MemberService();

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("GoHome");
    res.render("home");
  } catch (err) {
    console.log("Error: goHome", err);
    res.redirect("/admin");
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("GetSignup");
    res.render("signup");
  } catch (err) {
    console.log("Error:getSignup", err);
    res.redirect("/admin");
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("GetLogin");
    res.render("login");
  } catch (err) {
    console.log("Error: getLogin", err);
    res.redirect("/admin");
  }
};

restaurantController.processSignup = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("processSignup");

    const file = req.file;
    console.log("req.file", req.file);
    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path;
    newMember.memberType = MemberType.RESTAURANT;
    const result = await memberService.processSignup(newMember);

    req.session.member = result;
    req.session.save(() => {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error: processSignup", err);
    const message =
      err instanceof Error ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/signup')</script>`
    );
  }
};

restaurantController.processLogin = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("processLogin");
    const input: LoginInput = req.body;
    const result = await memberService.processLogin(input);
    req.session.member = result;
    req.session.save(() => {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error: processSignup", err);
    const message =
      err instanceof Error ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/signup')</script>`
    );
  }
};

restaurantController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(() => {
      res.clearCookie("connection.sid", { path: "/" });
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error: Logout", err);
    res.redirect("/admin");
  }
};

restaurantController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getAllUsers");
    const result = await memberService.getUsers();
    res.render("users", { users: result });
  } catch (err) {
    console.log("Error: getAllUsers", err);
    res.redirect("/admin/login");
  }
};

restaurantController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
    const result = await memberService.updateChosenUser(req.body);
    console.log("USER UPDATE", result);
    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error: updateChosenUser", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

restaurantController.checkAuthSession = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("Check Test");
    if (req.session?.member)
      res.send(
        `<script> alert("HI: ${req.session.member.memberNick}")</script>`
      );
    else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}")</script>`);
  } catch (err) {
    console.log("Error: Check", err);
    res.send(err);
  }
};

restaurantController.verifyRestaurant = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.member?.memberType === MemberType.RESTAURANT) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login');</script>`
    );
  }
};

export default restaurantController;
