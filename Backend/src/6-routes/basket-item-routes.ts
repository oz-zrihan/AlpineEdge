import express, { Request, Response, NextFunction } from "express";
import basketItemService from "../5-services/basket-item-service";
import BasketItemModel from "../2-models/basket-item-model";
// Model
// Service

const router = express.Router();

// GET http://localhost:4000/api/basketItems/
router.get(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const basketItems = await basketItemService.getItems(id);
      response.json(basketItems);
    } catch (err: any) {
      next(err);
    }
  }
);

// GET http://localhost:4000/api/basketItems/
router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const item = new BasketItemModel(request.body.item);
      const basketId = request.body.basketId;

      const addedItem = await basketItemService.addItem(item, basketId);
      response.json(addedItem);
    } catch (err: any) {
      next(err);
    }
  }
);

// PUT http://localhost:4000/api/basketItems/
router.put(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const item = new BasketItemModel(request.body);
      const updatedItem = await basketItemService.updateItem(item);
      response.json(updatedItem);
    } catch (err: any) {
      next(err);
    }
  }
);

// DELETE http://localhost:4000/api/basketItems/:id
router.delete(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      await basketItemService.deleteItem(id);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
