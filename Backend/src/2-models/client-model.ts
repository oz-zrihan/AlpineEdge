import Joi, { number, string } from "joi";
// Models
import { ValidationError } from "./client-errors";
import AddressModel from "./address-model";

class ClientModel {
  public clientId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public addressId: number;
  public token?:string

  public constructor(user: ClientModel) {
    this.clientId = user.clientId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.addressId = user.addressId;
    this.token = user.token;
  }

  // ============ validation

  // ================= POST VALIDATION ======================
  public static postValidationSchema = Joi.object({
    clientId: Joi.number().forbidden().positive().integer(),
    firstName: Joi.string().required().min(2).max(30),
    lastName: Joi.string().required().min(2).max(50),
    email: Joi.string().required().min(3).max(50),
    password: Joi.string()
      .required()
      .min(6)
      .max(256)
      .pattern(/(?=^.{6,10}$)(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*s).*$/, {
        name: "password",
        invert: false,
      }),
    addressId:  Joi.number().forbidden().positive().integer(),
    token: Joi.string().optional()

  });

  public validatePost(): void {
    const result = ClientModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  // ================= PUT VALIDATION ======================
  private static putValidationSchema = Joi.object({
    clientId: Joi.number().required().positive().integer(),
    firstName: Joi.string().required().min(2).max(30),
    lastName: Joi.string().required().min(2).max(50),
    email: Joi.string().required().min(3).max(50),
    password: Joi.string()
      .required()
      .min(6)
      .max(256)
      .pattern(/(?=^.{6,10}$)(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*s).*$/, {
        name: "password",
        invert: false,
      }),
    addressId:  Joi.number().optional().positive().integer(),
    token: Joi.string().optional()
  });

  public validatePut(): void {
    const result = ClientModel.putValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default ClientModel;
