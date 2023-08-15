import express, { Request, Response, NextFunction } from "express";
// Model
import ImageModel from "../2-models/image-Model";
// Service
import imagesService from "../5-services/images-service";
import { UploadedFile } from "express-fileupload";

const router = express.Router();

    // GET http://localhost:4000/api/images/:imageName
    router.get(
      "/:imageName",
      async (request: Request, response: Response, next: NextFunction) => {
        try {
          const imageName = request.params.imageName;
          const image = await imagesService.getImageUrl(imageName);
          response.sendFile(image);
        } catch (err: any) {
          next(err);
        }
      }
    );

    // POST http://localhost:4000/api/images/:imageFolder
    router.post(
      "/",
      async (request: Request, response: Response, next: NextFunction) => {
        try {
          const images: ImageModel = new ImageModel({
            imageFile: request.files["imageFile"] as UploadedFile
          });

          const uploadedImageName = await imagesService.addImage(images);
          response.status(201).json(uploadedImageName);
        } catch (err: any) {
          next(err);
        }
      }
    );

    // DELETE http://localhost:4000/api/images/deleteImage/
    router.delete(
      "/deleteImage",
      async (request: Request, response: Response, next: NextFunction) => {
        try {
          const imagesUrl = request.body.imagesUrl;
          await imagesService.deleteImage(imagesUrl);
          response.sendStatus(204);
        } catch (err: any) {
          next(err);
        }
      }
    );



export default router;
