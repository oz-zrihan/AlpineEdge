import { BasketData, BasketModel } from "../2-models/basket-model";
import dal from "../4-utils/dal";
import basketItemService from "./basket-item-service";

//  ====================== Get basket ======================
async function getBasket(id: string): Promise<BasketModel> {
  //Query
  const sql = `SELECT * FROM basket WHERE basketId = ?`;

  // Execute:
  const basket = await dal.execute(sql, [id]);

  const items = await basketItemService.getItems(id);

  basket.items = items;

  // Calculate the total price of the basket by summing up the individual totals of each item
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  //Query
  const totalSql = `UPDATE basket SET totalPrice = ? WHERE basketId = ?`;

  // Execute:
  await dal.execute(sql, [total, id]);

  // Create the BasketModel instance and assign the items and total
  const basketData: BasketData = {
    basketId: basket.basketId,
    basketItems: items,
    totalPrice: total,
  };

  const basketModel = new BasketModel(basketData);

  return basketModel;
}

//  ====================== Create basket ======================
async function createBasket(basket: BasketModel): Promise<BasketModel> {
  if (!basket.totalPrice) basket.totalPrice = 0;

  basket.validatePost();

  //Query
  const sql = `INSERT INTO basket  VALUES( ?, ?)`;

  // Execute:
  await dal.execute(sql, [basket.basketId, basket.totalPrice]);
  const createdBasket = await getBasket(basket.basketId);
  return createdBasket;
}

//  ====================== Delete basket ======================
async function deleteBasket(id: string): Promise<void> {
  //Query
  const itemsIdSql = `SELECT basketItemId FROM basketJunction WHERE basketId = ?`;

  // Execute:
  const itemsId = await dal.execute(itemsIdSql, [id]);
  //Query
  const junctionSql = `DELETE FROM basketJunction WHERE basketItemId = ?`;

  // Execute:
  await dal.execute(junctionSql, [id]);
  //Query
  const sql = `DELETE FROM basket WHERE basketId = ?`;

  // Execute:
  await dal.execute(sql, [id]);
  //  itemsId.forEach(i => basketItemService.deleteItem(i));
}

export default {
  getBasket,
  createBasket,
  deleteBasket,
};
