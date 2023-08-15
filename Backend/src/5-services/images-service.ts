import { OkPacket } from "mysql";
// Model
import { ResourceNotFoundError } from "../2-models/client-errors";
import ImageModel from "../2-models/image-Model";
// Utils
import imageHandler from "../4-utils/image-handler";
import dal from "../4-utils/dal";


//  ====================== Get image file from specific folder ======================
async function getImageUrl(
  imageName: string
): Promise<string> {
  // Get images file from folder
  const imageUrl = await imageHandler.getImagePath(imageName);

  // Error if not exist
  if (!imageUrl) {
    throw new ResourceNotFoundError(imageName);
  }

  return imageUrl;
}
//  ====================== Add image file from specific folder ======================
async function addImage(image: ImageModel): Promise<string> {
  // Image validation
  image.validateImage();

  // Save image to local folder
  const imageName = await imageHandler.saveImage(
    image.imageFile,
  );

  return imageName;
}

//  ====================== Delete images file from specific folder ======================
async function deleteImage(
  imageUrl: string,
): Promise<void> {
  // Delete images from server
  await imageHandler.deleteImage(imageUrl);
}


export default {
  getImageUrl,
  addImage,
  deleteImage,
};
