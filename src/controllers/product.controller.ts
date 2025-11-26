import { T } from "../libs/types/common";
import { Request, Response } from "express";
import {
  AdminRequest,
  ExtendedRequest,
  LoginInput,
  MemberInput,
} from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/errors";
import ProductService from "../models/Product.service";
import { ProductInput, ProductInquiry } from "../libs/types/product";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { ProductCollection } from "../libs/enums/product.enum";

const productController: T = {};
const productService = new ProductService();

productController.getProducts = async (req: Request, res: Response) => {
  try {
    console.log("getProducts");
    const { page, limit, order, productCollection, search } = req.query;
    const inquiry: ProductInquiry = {
      order: String(order),
      page: Number(page),
      limit: Number(limit),
    };
    if (productCollection) {
      inquiry.productCollection = productCollection as ProductCollection;
    }
    if (search) {
      inquiry.search = String(search);
    }
    console.log("=======", inquiry);
    const result = await productService.getProducts(inquiry);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error:getProducts", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.getProduct = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getProduct");
    const id = req.params.id;
    const memberId = req.member?._id ?? null;
    const result = await productService.getProduct(memberId, id);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error:getProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

/* SSR */

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
    console.log("createNewProtuct");
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
