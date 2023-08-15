import Joi, { number, string } from "joi";
// Models
import { ValidationError } from "./client-errors";

class ProductBrandModel {
  public  brandId : number;
  public  brandName : string;


  public constructor(productBrand: ProductBrandModel) {
    this.brandId = productBrand.brandId;
    this.brandName = productBrand.brandName;
   
  }

  // ============ validation

  // ================= POST VALIDATION ======================
  public static postValidationSchema = Joi.object({
    brandId: Joi.number().forbidden().positive().integer(),
    brandName: Joi.string().required(),
  });

  public validatePost(): void {
    const result = ProductBrandModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  // ================= PUT VALIDATION ======================
  public static putValidationSchema = Joi.object({
    brandId: Joi.number().required().positive().integer(),
    brandName: Joi.string().required(),
  });

  public validatePut(): void {
    const result = ProductBrandModel.putValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

}

export default ProductBrandModel;
