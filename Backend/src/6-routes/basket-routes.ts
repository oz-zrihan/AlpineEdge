import express, { Request, Response, NextFunction } from "express";
// Model
import ProductModel from "../2-models/product-model";
// Service
import basketService from "../5-services/basket-service";
import {BasketModel} from "../2-models/basket-model";

const router = express.Router();

// GET http://localhost:4000/api/basket/
router.get(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const basket = await basketService.getBasket(id);
      response.json(basket);
    } catch (err: any) {
      next(err);
    }
  }
);

// GET http://localhost:4000/api/basket/
router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const basket = new BasketModel(request.body);
      const createdBasket = await basketService.createBasket(basket);
      response.json(createdBasket);
    } catch (err: any) {
      next(err);
    }
  }
);


// DELETE http://localhost:4000/api/basket/:id
router.delete(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.body.id;
      await basketService.deleteBasket(id);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
