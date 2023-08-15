import { UploadedFile } from "express-fileupload";
import Joi from "joi";
// Models
import { ValidationError } from "./client-errors";

class ImageModel {
  public imageFile: UploadedFile;

  public constructor(image: {
    imageFile: UploadedFile;
  }) {
    this.imageFile = image.imageFile;
  }

  // ============ validation

  // ================= IMAGE VALIDATION ====================

  private static imageValidationSchema = Joi.object({
    name: Joi.string()
      .pattern(/\.jpg$|\.jpeg$|\.png$|\.bmp$|\.webp$|\.svg$/i)
      .required(),
    mimetype: Joi.string()
      .pattern(/^image\/(jpg|jpeg|png|bmp|webp|svg\+xml)$/i)
      .required(),
    size: Joi.number().required(),
  });

  public validateImage(): void {
    
      const result = ImageModel.imageValidationSchema.validate({
        name: this.imageFile.name,
        mimetype: this.imageFile.mimetype,
        size: this.imageFile.size,
      });

      if (result.error) throw new ValidationError(result.error.message);
    
  }

}

export default ImageModel;
