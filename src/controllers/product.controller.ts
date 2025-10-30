import { T } from "../libs/types/common";
import { Request, Response } from "express";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/errors";
import ProductService from "../models/Product.service";
import { ProductInput } from "../libs/types/product";
import { shapeIntoMongooseObjectId } from "../libs/config";

const productController: T = {};
const productService = new ProductService();

productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllproducts");
    const data = await productService.getAllProducts();
    console.log("data", data);

    res.render("products", { products: data });
  } catch (err) {
    console.log("Error:getAllProducts", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.createNewProduct = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createNewProduct");
    console.log("req: files", req.files);

    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);
    const data: ProductInput = req.body;
    data.productImages = req?.files.map((ele) => {
      return ele.path.replace(/\\/g, "/");
    });

    await productService.createNewProduct(data);

    res.send(
      `<script> alert("Successful creation"); window.location.replace('/admin/product/all');</script>`
    );
  } catch (err) {
    console.log("Error:createNewProduct", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/product/all');</script>`
    );
  }
};

productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenProtuct");
    const id = shapeIntoMongooseObjectId(req.params.id);
    const input = req.body;
    const result = await productService.updateChosenProduct(id, input);
    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error: updateChosenProduct:", err);

    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default productController;
