import {Request, Response} from 'express';
import {T} from '../libs/types/common';

const memberController: T = {}
memberController.goHome = (req: Request, res: Response) => {
    try {
        res.send('Home Page');
    } catch (error) {
        console.error('Error in goHome:', error);
        res.status(500).send('Internal Server Error');
    }
}
memberController.getLogin = (req: Request, res: Response) => {
    try {
        res.send('Login Page');
    } catch (error) {
        console.error('Error in getLogin:', error);
        res.status(500).send('Internal Server Error');
    }
}
memberController.getSignUp = (req: Request, res: Response) => {
    try {
        res.send('SignUp Page');
    } catch (error) {
        console.error('Error in getSignUp:', error);
        res.status(500).send('Internal Server Error');
    }
}

export default memberController;