import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";


/* Restaurant */
routerAdmin.get("/", restaurantController.goHome);
routerAdmin
.get("/login", restaurantController.getLogin)
.post("/login", restaurantController.processLogin);

routerAdmin.get("/check-me", restaurantController.checkAuthenSession);


routerAdmin
.get("/signup", restaurantController.getSignup)
.post("/signup", restaurantController.processSignup);


/* Product */
/* User */


export default routerAdmin;
