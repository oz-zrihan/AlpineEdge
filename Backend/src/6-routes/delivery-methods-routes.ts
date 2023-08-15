import express, { Request, Response, NextFunction } from "express";
// Model
import DeliveryMethodModel from "../2-models/delivery-method-model";
// Service
import deliveryMethodService from "../5-services/delivery-methods-service";

const router = express.Router();

// GET http://localhost:4000/api/deliveryMethods
router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const deliveryMethods = await deliveryMethodService.getAllDeliveryMethods();
      response.json(deliveryMethods);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:4000/api/deliveryMethods/
router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const deliveryMethod = new DeliveryMethodModel(request.body);
      const addedDeliveryMethod = await deliveryMethodService.insertDeliveryMethod(deliveryMethod);
      response.status(201).json(addedDeliveryMethod);
    } catch (err: any) {
      next(err);
    }
  }
);


export default router;
