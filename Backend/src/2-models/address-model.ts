import Joi, { number, string } from "joi";
// Models
import { ValidationError } from "./client-errors";

class AddressModel {
  public addressId:number;
  public country: string;
  public city: string;
  public street: string;
  public zipcode: string;

  public constructor(address: AddressModel) {
    this.addressId = address.addressId;
    this.country = address.country;
    this.city = address.city;
    this.street = address.street;
    this.zipcode = address.zipcode;
  }

  // ============ validation

  // ================= POST VALIDATION ======================
  private static postValidationSchema = Joi.object({
    addressId: Joi.number().forbidden().positive().integer(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    zipcode: Joi.string().required(),
  });

  public validatePost(): void {
    const result = AddressModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  // ================= PUT VALIDATION ======================
  private static putValidationSchema = Joi.object({
    addressId: Joi.number().required().positive().integer(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    zipcode: Joi.string().required(),
  });

  public validatePut(): void {
    const result = AddressModel.putValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default AddressModel;
