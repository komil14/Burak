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

export default restaurantController;