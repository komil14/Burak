import { Request, Response } from 'express';
import { T } from '../libs/types/common';

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

restaurantController.processSignup = (req: Request, res: Response) => {
  try {
    console.log("Processing Signup");
    res.send("Signup Processed");
  } catch (err) {
    console.log("Error, processSignup:", err);
  }
};

export default restaurantController;