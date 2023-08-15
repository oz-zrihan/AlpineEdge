import path from "path";
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";
import { UploadedFile } from "express-fileupload";
import appConfig from "./app-config";
// Model

// __dirname returns current file (image-handler.ts) directory
const imagesFolder = path.join(__dirname, "..", "1-assets", "images");


// ================================ Get image full path ================================
function getImagePath(imageName: string): string {
  return imagesFolder + "/" + imageName;
}

// ================================ Save images to disk: ================================
async function saveImage(image: UploadedFile): Promise<string> {
  // Take original extension:
  const extension = image.name.substring(image.name.lastIndexOf("."));

  // Create unique name:
  const uniqueName = uuid() + extension;

  // Get absolute path:
  const absolutePath = getImagePath(uniqueName);

  // Save image:
  await image.mv(absolutePath);

  // Return unique name:
  return uniqueName;
}

// ================================ Update image in disk: ================================
async function updateImage(
  image: UploadedFile,
  existingName: string
): Promise<string> {
  // Remove existing image:
  await deleteImage(existingName);

  // Save new image:
  const uniqueName = await saveImage(image);

  // Return unique name:
  return uniqueName;
}

// ================================ Delete images from disk: ================================
async function deleteImage(imageUrl: string): Promise<void> {
  try {
    // If no image sent:
    if (!imageUrl) return;

    // Get absolute path:
    const absolutePath = getImagePath(imageUrl);

    // Delete image:
    await fsPromises.unlink(absolutePath);
  } catch (err: any) {
    console.error(err.message);
  }
}

export default {
  getImagePath,
  saveImage,
  updateImage,
  deleteImage,
};
