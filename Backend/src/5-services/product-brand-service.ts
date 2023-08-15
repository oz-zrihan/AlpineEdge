import { OkPacket } from "mysql";
// Model
import ProductBrandModel from "../2-models/product-brand-model";
// Utils
import dal from "../4-utils/dal";

// ====================== Get all productBrands ======================
async function getAllProductBrands(): Promise<ProductBrandModel[]> {
  // Query
  const sql = `SELECT * FROM productBrand`;

  // Execute:
  const productBrand = await dal.execute(sql);

  return productBrand;
}

// ====================== insert productBrand ======================
async function insertProductBrand(productBrand: ProductBrandModel): Promise<ProductBrandModel> {
  
  // Delete productBrand id
  delete productBrand.brandId;

  // Joi validation
  productBrand.validatePost();

  // Query
  const sql = `INSERT INTO productBrand VALUES(DEFAULT, ?)`;

  // Execute:
  const result: OkPacket = await dal.execute(sql, [productBrand.brandName]);

  // Insert to productBrand given Id
  productBrand.brandId = result.insertId;

  return productBrand;
}

export default {
  getAllProductBrands,
  insertProductBrand,
};
