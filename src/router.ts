import express from "express";
import memberController from "./controllers/member.controller";
import makeUploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";
import orderController from "./controllers/order.controller";
const router = express.Router();
/*MEMBERS*/
router
  .post("/member/signup", memberController.signup)
  .post("/member/login", memberController.login)
  .post("/member/logout", memberController.verifyAuth, memberController.logout)
  .get(
    "/member/detail",
    memberController.verifyAuth,
    memberController.getMemberDetail
  )
  .post(
    "/member/update",
    memberController.verifyAuth,
    makeUploader("members").single("memberImage"),
    memberController.updateMember
  )
  .get("/member/top-users", memberController.getTopUsers)
  .get("/member/restaurant", memberController.getRestaurant);

/*PRODUCTS*/
router
  .get("/product/all", productController.getProducts)
  .get(
    "/product/:id",
    memberController.retrieveAuth,
    productController.getProduct
  );

  /* ORDERS */
router
  .post("/order/create", memberController.verifyAuth, orderController.createOrder)

export default router;
