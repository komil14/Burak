import { Request, Response } from 'express';
import { T } from '../libs/types/common';
import MemberService from '../models/Member.service';
import { MemberInput } from '../libs/types/member';


const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("Accessing Home Page");
    res.send("Home Page");
  } catch (err) {
    console.log("Error, goHome:", err);
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("Accessing Login Page");
    res.send("Login Page");
  } catch (err) {
    console.log("Error, getLogin:", err);
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("Accessing Signup Page");
    res.send("Signup Page");
  } catch (err) {
    console.log("Error, getSignup:", err);
  }
};

restaurantController.processLogin = (req: Request, res: Response) => {
  try {
    console.log("Processing Login");
    res.send("Login Processed");
  } catch (err) {
    console.log("Error, processLogin:", err);
  }
};

restaurantController.processSignup = async(req: Request, res: Response) => {
  try {
    console.log("Processing Signup");
    console.log("req.body:", req.body);
    const newMember: MemberInput = req.body;
    newMember.memberType = newMember.RESTARANT;
    
    const memberService = new MemberService();
    const result = await memberService.processSignup(newMember);
    res.send(result);
  } catch (err) {
    console.log("Error, processSignup:", err);
    res.send(err);
  }
};

export default restaurantController;