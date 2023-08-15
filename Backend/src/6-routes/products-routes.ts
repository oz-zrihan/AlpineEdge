import express, { Request, Response, NextFunction } from "express";
// Model
import ProductModel from "../2-models/product-model";
// Service
import productsService from "../5-services/products-service";
import productBrandService from "../5-services/product-brand-service";
import productTypeService from "../5-services/product-type-service";

const router = express.Router();

// GET http://localhost:4000/api/products/typedId=1&brandId=1&pageIndex=1&pageSize=10&sort=name
router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const typeId = +request.query.typeId;
      const brandId = +request.query.brandId;
      const pageIndex = +request.query.pageIndex;
      const pageSize = +request.query.pageSize;
      const sort = request.query.sort as string;
      const search = request.query.search as string;

      const products = await productsService.getProducts(
        typeId,
        brandId,
        pageIndex,
        pageSize,
        sort,
        search
      );

      const totalCount = await productsService.getProductCount(
        typeId,
        brandId,
        search
      );

      response.json({ data: products, pageIndex, pageSize, count: totalCount });
    } catch (err: any) {
      next(err);
    }
  }
);

// GET http://localhost:4000/api/products/:id
router.get(
  "/:id([0-9]+)",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const product = await productsService.getSingleProduct(id);
      response.json(product);
    } catch (err: any) {
      next(err);
    }
  }
);
// GET http://localhost:4000/api/products/brands/all
router.get(
  "/brands/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const brands = await productBrandService.getAllProductBrands();
      response.json(brands);
    } catch (err: any) {
      next(err);
    }
  }
);
// GET http://localhost:4000/api/products/brands/all
router.get(
  "/types/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const types = await productTypeService.getAllProductTypes();
      response.json(types);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:4000/api/products/
router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const product = new ProductModel(request.body);
      const addedProduct = await productsService.insertProduct(product);
      response.status(201).json(addedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
