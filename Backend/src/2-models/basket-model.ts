import Joi from "joi";
import { ValidationError } from "./client-errors";
import BasketItemModel from "./basket-item-model";

interface BasketData {
  basketId: string;
  basketItems: BasketItemModel[];
  totalPrice: number;
}

class BasketModel implements BasketData {
  public basketId: string;
  public basketItems: BasketItemModel[]; 
  public totalPrice: number;

  public constructor(basket: BasketData) {
    this.basketId = basket.basketId;
    this.basketItems = basket.basketItems;
    this.totalPrice = basket.totalPrice;
  }

  // ============ validation
  private static postValidationSchema = Joi.object({
    basketId: Joi.string().required(),
    totalPrice: Joi.number().min(0).optional(),
  });

  public validatePost(): void {
    const result = BasketModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  // ================= PUT VALIDATION ======================
  private static putValidationSchema = Joi.object({
    basketId: Joi.string().required(),
    totalPrice: Joi.number().min(0).optional(),
  });

  public validatePut(): void {
    const result = BasketModel.putValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export  {BasketModel, BasketData};
