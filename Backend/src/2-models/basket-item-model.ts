import Joi, { number, string } from "joi";
// Models
import { ValidationError } from "./client-errors";

class BasketItemModel {
  public basketItemId: number;
  public productId: number;
  public productName: string;
  public price: number;
  public quantity: number;
  public pictureUrl: string;
  public type: string;
  public brand: string;

  public constructor(item: BasketItemModel) {
    this.basketItemId = item.basketItemId;
    this.productId = item.productId;
    this.productName = item.productName;
    this.price = item.price;
    this.quantity = item.quantity;
    this.pictureUrl = item.pictureUrl;
    this.type = item.type;
    this.brand = item.brand;
  }

  // ============ validation

  // ================= POST VALIDATION ======================
  private static postValidationSchema = Joi.object({
    basketItemId: Joi.number().required().positive().integer(),
    productId: Joi.number().required().positive().integer(),
    productName: Joi.string().required(),
    price: Joi.number().positive().required(),
    quantity: Joi.number().positive().required(),
    pictureUrl: Joi.string().required(),
    type: Joi.string().required(),
    brand: Joi.string().required(),
  });

  public validatePost(): void {
    const result = BasketItemModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  // ================= PUT VALIDATION ======================
  private static putValidationSchema = Joi.object({
    basketItemId: Joi.number().required().positive().integer(),
    productId: Joi.number().required().positive().integer(),
    productName: Joi.string().required(),
    price: Joi.number().positive().required(),
    quantity: Joi.number().positive().required(),
    pictureUrl: Joi.string().required(),
    type: Joi.string().required(),
    brand: Joi.string().required(),
  });

  public validatePut(): void {
    const result = BasketItemModel.putValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default BasketItemModel;
