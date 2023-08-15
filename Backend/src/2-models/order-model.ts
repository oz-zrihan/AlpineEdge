import Joi, { number, string } from "joi";
// Models
import { ValidationError } from "./client-errors";
import ClientModel from "./client-model";
import { BasketModel } from "./basket-model";
import DeliveryMethodModel from "./delivery-method-model";
import OrderStatus from "./order-status";

class OrderModel {
  public orderId: number;
  public clientId: number;
  public client?: ClientModel;
  public basketId: string;
  public basket?: BasketModel;
  public orderDate: string;
  public deliveryMethodId: number;
  public deliveryMethod?: DeliveryMethodModel;
  public finalPrice: number;
  public orderStatus: OrderStatus;

  public constructor(order: OrderModel) {
    this.orderId = order.orderId;
    this.clientId = order.clientId;
    this.basketId = order.basketId;
    this.orderDate = order.orderDate;
    this.deliveryMethodId = order.deliveryMethodId;
    this.finalPrice = order.finalPrice;
    this.orderStatus = order.orderStatus;
  }

  // ============ validation

  // ================= POST VALIDATION ======================
  private static postValidationSchema = Joi.object({
    orderId: Joi.number().forbidden().positive().integer(),
    clientId: Joi.number().required().positive().integer(),
    basketId: Joi.string().required(),
    orderDate: Joi.string().required(),
    deliveryMethodId: Joi.number().required().positive().integer(),
    finalPrice: Joi.number().required().min(0),
    orderStatus: Joi.string().valid('Pending', 'Payment Received', 'Payment Failed').required(),

  });

  public validatePost(): void {
    const result = OrderModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
  // ================= PUT VALIDATION ======================
  private static putValidationSchema = Joi.object({
    orderId: Joi.number().required().positive().integer(),
    clientId: Joi.number().required().positive().integer(),
    basketId: Joi.string().required(),
    orderDate: Joi.string().required(),
    deliveryMethodId: Joi.number().required().positive().integer(),
    finalPrice: Joi.number().required().min(0),
    orderStatus: Joi.string().valid('Pending', 'Payment Received', 'Payment Failed').required(),

  });

  public validatePut(): void {
    const result = OrderModel.putValidationSchema.validate(this);
    console.log(result);
    
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default OrderModel;
