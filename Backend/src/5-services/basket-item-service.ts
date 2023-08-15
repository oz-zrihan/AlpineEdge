import { OkPacket } from "mysql";
import BasketItemModel from "../2-models/basket-item-model";
import dal from "../4-utils/dal";

//  ====================== Get basket items ======================
async function getItems(id: string): Promise<BasketItemModel[]> {
  //Query
  const sql = `SELECT *
                FROM basketJunction
                JOIN basketItem ON basketJunction.basketItemId = basketItem.basketItemId
                WHERE basketId = ?`;

  // Execute:
  const items = await dal.execute(sql, [id]);

  return items;
}

//  ====================== Add basket Items ======================
async function addItem(
  item: BasketItemModel,
  basketId: string
): Promise<BasketItemModel> {

  console.log("item, basketId ==== 1");
  console.log(item, basketId);
  
  //Query
  const sql = `INSERT INTO basketItem  VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?)`;

  // Execute:
  const items: OkPacket = await dal.execute(sql, [
    item.productId,
    item.productName,
    item.price,
    item.quantity,
    item.pictureUrl,
    item.type,
    item.brand,
  ]);

  item.basketItemId = items.insertId;

  console.log("basketId ,items.insertId  ====== 2");
  console.log(basketId ,items.insertId);
  
  //Query
  const junctionSql = `INSERT INTO basketJunction VALUES(DEFAULT, ?, ?)`;

  console.log(junctionSql , basketId, item.basketItemId);
  
  // Execute:
  await dal.execute(junctionSql, [basketId, item.basketItemId]);

  return item;
}

//  ====================== Update basket item ======================
async function updateItem(item: BasketItemModel): Promise<BasketItemModel> {
  //Query
  const sql = `UPDATE basketItem SET 
                    productId = ?,
                    productName = ?,
                    price = ?,
                    quantity = ?,
                    pictureUrl = ?,
                    type = ?,
                    brand = ?
                WHERE basketItemId = ?`;

  // Execute:
  await dal.execute(sql, [
    item.productId,
    item.productName,
    item.price,
    item.quantity,
    item.pictureUrl,
    item.type,
    item.brand,
    item.basketItemId,
  ]);

  return item;
}
//  ====================== Delete basket item ======================
async function deleteItem(id: number): Promise<void> {
  //Query
  const junctionSql = `DELETE FROM basketJunction WHERE basketItemId = ?`;

  // Execute:
  await dal.execute(junctionSql, [id]);

  //Query
  const sql = `DELETE FROM basketItem WHERE basketItemId = ?`;

  // Execute:
  await dal.execute(sql, [id]);
}

export default {
  getItems,
  addItem,
  updateItem,
  deleteItem,
};
