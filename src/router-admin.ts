import express from "express";
import restaurantController from "./controllers/restaurant.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";
const routerAdmin = express.Router();

// RESTAURANT
routerAdmin.get("/", restaurantController.goHome);

routerAdmin
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);

routerAdmin
  .get("/signup", restaurantController.getSignup)
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    restaurantController.processSignup
  );

routerAdmin.get("/check-me", restaurantController.checkAuthSession);
routerAdmin.get("/logout", restaurantController.logout);

// PRODUCT
routerAdmin
  .get(
    "/product/all",
    restaurantController.verifyRestaurant,
    productController.getAllProducts
  )
  .post(
    "/product/create",
    restaurantController.verifyRestaurant,
    makeUploader("products").array("productImages", 5),
    productController.createNewProduct
  )
  .post(
    "/product/:id",
    restaurantController.verifyRestaurant,
    productController.updateChosenProduct
  );

// USER

routerAdmin
  .get(
    "/user/all",
    restaurantController.verifyRestaurant,
    restaurantController.getUsers
  )
  .post(
    "/user/edit",
    restaurantController.verifyRestaurant,
    restaurantController.updateChosenUser
  );
export default routerAdmin;
