import Joi, { number, string } from "joi";
// Models
import { ValidationError } from "./client-errors";

class ProductTypeModel {
  public typeId: number;
  public typeName: string;
  public image: string;

  public constructor(productType: ProductTypeModel) {
    this.typeId = productType.typeId;
    this.typeName = productType.typeName;
    this.image = productType.image;
  }

  // ============ validation

  // ================= POST VALIDATION ======================
  public static postValidationSchema = Joi.object({
    typeId: Joi.number().forbidden().positive().integer(),
    typeName: Joi.string().required(),
    image: Joi.string().optional(),
  });

  public validatePost(): void {
    const result = ProductTypeModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  // ================= PUT VALIDATION ======================
  public static putValidationSchema = Joi.object({
    typeId: Joi.number().required().positive().integer(),
    typeName: Joi.string().required(),
    image: Joi.string().optional(),
  });

  public validatePut(): void {
    const result = ProductTypeModel.putValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default ProductTypeModel;
