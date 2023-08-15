import { OkPacket } from "mysql";
// Model
import ProductTypeModel from "../2-models/product-type-model";
// Utils
import dal from "../4-utils/dal";

// ====================== Get all productTypes ======================
async function getAllProductTypes(): Promise<ProductTypeModel[]> {
  // Query
  const sql = `SELECT * FROM productType`;

  // Execute:
  const productType = await dal.execute(sql);

  return productType;
}

// ====================== insert productType ======================
async function insertProductType(productType: ProductTypeModel): Promise<ProductTypeModel> {
  
  // Delete productType id
  delete productType.typeId;

  // Joi validation
  productType.validatePost();

  // Query
  const sql = `INSERT INTO productType VALUES(DEFAULT, ?)`;

  // Execute:
  const result: OkPacket = await dal.execute(sql, [productType.typeName]);

  // Insert to productType given Id
  productType.typeId = result.insertId;

  return productType;
}

export default {
  getAllProductTypes,
  insertProductType,
};
