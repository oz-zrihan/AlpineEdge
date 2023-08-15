import { OkPacket } from "mysql";
// Models
import { ResourceNotFoundError } from "../2-models/client-errors";
import ProductModel from "../2-models/product-model";

// Utils
import dal from "../4-utils/dal";

async function getProducts(
  typeId: number | undefined,
  brandId: number | undefined,
  pageIndex: number,
  pageSize: number,
  sort: string = "ASC",
  search?: string
): Promise<ProductModel[]> {
  // Calculate the OFFSET based on the pageIndex and pageSize
  const offset = (pageIndex - 1) * pageSize;

  // Search term
  const searchTerm = search ? `%${search}%` : "%";

  // If the sort parameter is not provided or is "ASC", set a default sorting column
  let sortColumn: string;

  switch (sort) {
    case "ASC":
      sortColumn = "name"; // Sorting alphabetically by name
      break;
    case "priceAsc":
      sortColumn = "price"; // Sorting by price in ascending order
      break;
    case "priceDesc":
      sortColumn = "price"; // Sorting by price in descending order
      break;
    default:
      sortColumn = "name"; // Default sorting by name
  }
  // Base SQL query without type and brand filters
  let sql = `SELECT P.*, B.brandName, T.typeName
              FROM products AS P 
              JOIN productBrand AS B ON B.brandId = P.productBrandId 
              JOIN productType AS T ON T.typeId = P.ProductTypeId
              WHERE (P.name LIKE ? OR P.description LIKE ?)`;

  // Create an array with query parameters
  const queryParams = [searchTerm, searchTerm];

  // Optional type filter
  if (!Number.isNaN(typeId)) {
    sql += " AND P.productTypeId = ?";
    queryParams.push(typeId.toString());
  }

  // Optional brand filter
  if (!Number.isNaN(brandId)) {
    sql += " AND P.productBrandId = ?";
    queryParams.push(brandId.toString());
  }

  // Query with sorting and pagination
  sql += ` ORDER BY ${sortColumn} ${sort === "priceDesc" ? "DESC" : "ASC"}
           LIMIT ${pageSize} OFFSET ${offset}`;

  // Execute with parameters
  const products = await dal.execute(sql, queryParams);

  return products;
}

// ====================== Get products count ======================

async function getProductCount(
  typeId: number | undefined,
  brandId: number | undefined,
  search: string | undefined
): Promise<number> {
  let sql = `SELECT COUNT(*) as count FROM products
             WHERE (name LIKE ? OR description LIKE ?)`;

  const searchTerm = search ? `%${search}%` : "%";
  const queryParams = [searchTerm, searchTerm];

  // Optional type filter
  if (!Number.isNaN(typeId)) {
    sql += " AND productTypeId = ?";
    queryParams.push(typeId.toString());
  }

  // Optional brand filter
  if (!Number.isNaN(brandId)) {
    sql += " AND productBrandId = ?";
    queryParams.push(brandId.toString());
  }

  const result = await dal.execute(sql, queryParams);
  return result[0].count;
}

// ====================== Get single product ======================
async function getSingleProduct(id: number): Promise<ProductModel> {
  //Query
  const sql = `SELECT P.*, B.brandName, T.typeName
                    FROM products AS P 
                    JOIN productBrand AS B ON B.brandId = P.productBrandId 
                    JOIN productType AS T ON T.typeId = P.ProductTypeId
                    WHERE P.productId = ?`;

  // Execute:
  const products = await dal.execute(sql, [id]);
  const product = products[0];

  // Error if not exist
  if (!product) {
    throw new ResourceNotFoundError(id);
  }

  return product;
}

// ====================== Insert product ======================
async function insertProduct(product: ProductModel): Promise<ProductModel> {
  // Delete product id
  delete product.productId;

  // Joi validation
  product.validatePost();

  // Query
  const sql = `INSERT INTO products VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;

  // Execute:
  const result: OkPacket = await dal.execute(sql, [
    product.name,
    product.description,
    product.price,
    product.pictureUrl,
    product.typeId,
    product.brandId,
  ]);

  // Insert to user given Id
  product.productId = result.insertId;
  const addedProduct = await getSingleProduct(product.productId);
  return addedProduct;
}

// ====================== Update full product ======================
async function updateProduct(product: ProductModel): Promise<ProductModel> {
  // Joi validation
  product.validatePut();

  // Query
  const sql = `UPDATE products SET 
                                  name = ?,
                                  description = ?,
                                  price = ?,
                                  pictureUrl = ?,
                                  productTypeId = ?,
                                  productBrandId = ?,
                                  WHERE productId = ?`;

  // Execute:
  const result: OkPacket = await dal.execute(sql, [
    product.name,
    product.description,
    product.price,
    product.pictureUrl,
    product.typeId,
    product.brandId,
    product.productId,
  ]);

  // Validate execution
  if (result.affectedRows === 0) {
    throw new ResourceNotFoundError(product.productId);
  }

  const updatedProduct = await getSingleProduct(product.productId);
  return updatedProduct;
}

// ====================== Delete product ======================
async function deleteProduct(id: number): Promise<void> {
  // Query
  const sql = `DELETE FROM products WHERE productId = ?`;

  // Execute:
  const result: OkPacket = await dal.execute(sql, [id]);

  // Validate execution
  if (result.affectedRows === 0) {
    throw new ResourceNotFoundError(id);
  }
}

export default {
  getProducts,
  getProductCount,
  getSingleProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
};
