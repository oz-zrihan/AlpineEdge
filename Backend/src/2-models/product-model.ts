import Joi, { number, string } from "joi";
// Models
import { ValidationError } from "./client-errors";
import ProductTypeModel from "./product-type-model";
import ProductBrandModel from "./product-brand-model";

class ProductModel {
  public  productId : number;
  public  name : string;
  public  description : string;
  public  price : number;
  public  pictureUrl : string;

  public  typeId : number;
  public  productType : ProductTypeModel;

  public  brandId : number;
  public  productBrand : ProductBrandModel;
  

  public constructor(product: ProductModel) {
    this.productId = product.productId;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.pictureUrl = product.pictureUrl;
    this.typeId = product.typeId;
    this.productType = product.productType;
    this.brandId = product.brandId;
    this.productBrand = product.productBrand;
  }

  // ============ validation

  // ================= POST VALIDATION ======================
  private static postValidationSchema = Joi.object({
    productId: Joi.number().forbidden().positive().integer(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().positive(),
    pictureUrl: Joi.string().required(),
    typeId: Joi.number().required().positive().integer(),
    productType: Joi.array().items(ProductTypeModel.postValidationSchema).required(),
    brandId: Joi.number().required().positive().integer(),
    productBrand: Joi.array().items(ProductBrandModel.postValidationSchema).required(),
  });

  public validatePost(): void {
    const result = ProductModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  // ================= PUT VALIDATION ======================
  private static putValidationSchema = Joi.object({
    productId: Joi.number().required().positive().integer(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().positive(),
    pictureUrl: Joi.string().required(),
    typeId: Joi.number().required().positive().integer(),
    productType: Joi.array().items(ProductTypeModel.postValidationSchema).required(),
    brandId: Joi.number().required().positive().integer(),
    productBrand: Joi.array().items(ProductBrandModel.postValidationSchema).required(),

  });

  public validatePut(): void {
    const result = ProductModel.putValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

}

export default ProductModel;
