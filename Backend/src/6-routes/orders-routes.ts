import express, { Request, Response, NextFunction } from "express";
// Model
import OrdersModule from "../2-models/order-model";
// Service
import ordersService from "../5-services/orders-service";

const router = express.Router();

// GET http://localhost:4000/api/orders/client/:id[1-9]+
router.get(
  "/client",
  async (request: Request, response: Response, next: NextFunction) => {
    try {      
      const clientId = +request.query.clientId
      const orders = await ordersService.getAllOrders(clientId);
      response.json(orders);
    } catch (err: any) {
      next(err);
    }
  }
);
// GET http://localhost:4000/api/orders/id
router.get(
  "/:id(\\d+)",
  async (request: Request, response: Response, next: NextFunction) => {
    try {      
      console.log(request.params);
      
      const id = +request.params.id      
      const order = await ordersService.getSingleOrder(id);
      response.json(order);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:4000/api/orders/
router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {      
      const order = new OrdersModule(request.body);
      const addedOrder = await ordersService.insertOrder(order);
      console.log("addedOrder");
      console.log(addedOrder);
      
      
      response.status(201).json(addedOrder);
    } catch (err: any) {
      next(err);
    }
  }
);

// PUT http://localhost:4000/api/orders/
router.put(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const order = new OrdersModule(request.body);
      const updatedOrder = await ordersService.updateOrder(order);
      response.status(201).json(updatedOrder);
    } catch (err: any) {
      next(err);
    }
  }
);


export default router;
