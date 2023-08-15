import Joi, { number, string } from "joi";
// Models
import { ValidationError } from "./client-errors";

class DeliveryMethodModel {
  public deliveryMethodId: number;
  public name: string;
  public deliveryTime: string;
  public description: string;
  public price: number;

  public constructor(deliveryMethod: DeliveryMethodModel) {
    this.deliveryMethodId = deliveryMethod.deliveryMethodId;
    this.name = deliveryMethod.name;
    this.deliveryTime = deliveryMethod.deliveryTime;
    this.description = deliveryMethod.description;
    this.price = deliveryMethod.price;
  }

  // ============ validation

  // ================= POST VALIDATION ======================
  private static postValidationSchema = Joi.object({
    deliveryMethodId: Joi.number().forbidden().positive().integer(),
    name: Joi.string().required(),
    deliveryTime: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().positive(),
  });

  public validatePost(): void {
    const result = DeliveryMethodModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  // ================= PUT VALIDATION ======================
  private static putValidationSchema = Joi.object({
    deliveryMethodId: Joi.number().required().positive().integer(),
    name: Joi.string().required(),
    deliveryTime: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().positive(),
  });

  public validatePut(): void {
    const result = DeliveryMethodModel.putValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default DeliveryMethodModel;
