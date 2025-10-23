import { Request, Response } from 'express';
import { T } from '../libs/types/common';
import MemberService from '../models/Member.service';
import { AdminRequest, LoginInput, MemberInput } from '../libs/types/member';

const memberService = new MemberService();
const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("Accessing Home Page");
    res.render("home");
  } catch (err) {
    console.log("Error, goHome:", err);
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("Accessing Login Page");
    res.render("login");
  } catch (err) {
    console.log("Error, getLogin:", err);
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("Accessing Signup Page");
    res.render("signup");
  } catch (err) {
    console.log("Error, getSignup:", err);
  }
};

restaurantController.processLogin = async(req: AdminRequest, res: Response) => {
  try {
    console.log("Processing Login");
    console.log("req.body:", req.body);
    const input: LoginInput = req.body;

    const result = await memberService.processLogin(input);
    // TODO sessions authenticate here

    req.session.member = result;
    req.session.save(function(){
      console.log("Session saved");
      res.send(result);
    });
  } catch (err) {
    console.log("Error, processLogin:", err);
    res.send(err);
  }
};

restaurantController.processSignup = async(req: AdminRequest, res: Response) => {
  try {
    console.log("Processing Signup");
    console.log("req.body:", req.body);
    const newMember: MemberInput = req.body;
    newMember.memberType = newMember.RESTARANT;
    
    const result = await memberService.processSignup(newMember);
     // TODO sessions here
    req.session.member = result;
    req.session.save(function(){
      console.log("Session saved");
      res.send(result);
    });


    res.send(result);
  } catch (err) {
    console.log("Error, processSignup:", err);
    res.send(err);
  }
};

export default restaurantController;