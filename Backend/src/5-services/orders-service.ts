import { OkPacket } from "mysql";
// Models
import { ResourceNotFoundError } from "../2-models/client-errors";
import OrderModel from "../2-models/order-model";

// Utils
import dal from "../4-utils/dal";
import basketService from "./basket-service";
import { BasketModel } from "../2-models/basket-model";
import DeliveryMethodModel from "../2-models/delivery-method-model";
import deliveryMethodsService from "./delivery-methods-service";

//  ====================== Get all orders ======================
async function getAllOrders(clientId: number): Promise<OrderModel[]> {
  //Query
  const sql = `
    SELECT O.*, C.*, D.*
    FROM orders AS O
    JOIN clients AS C ON C.clientId = O.clientId
    JOIN deliveryMethod AS D ON D.deliveryMethodId = O.deliveryMethodId
    WHERE O.clientId = ?;
  `;

  // Execute:
  const orders = await dal.execute(sql, [clientId]);
  // Fetch the baskets for each order and attach them to the corresponding order
  const ordersWithBaskets = await Promise.all(
    orders.map(async (order) => {
      const basket: BasketModel = await basketService.getBasket(order.basketId);
      order.basket = basket;
      delete order.password
      return order;
    })
  );

  return ordersWithBaskets;
}

// ====================== Get single order ======================
async function getSingleOrder(id: number): Promise<OrderModel> {
  
  //Query
  const sql = `SELECT O.*, C.*, D.*
                FROM orders AS O
                JOIN clients AS C ON C.clientId = O.clientId
                JOIN deliveryMethod AS D ON D.deliveryMethodId = O.deliveryMethodId
                WHERE O.orderId = ?;`;

  // Execute:
  const orders = await dal.execute(sql, [id]);
  const order = orders[0];
  
  // Error if not exist
  if (!order) {
    throw new ResourceNotFoundError(id);
  }
  const basket: BasketModel = await basketService.getBasket(order.basketId);
  order.basket = basket;
  order.finalPrice = basket.totalPrice + order.price;
  delete order.password
  return order;
}

// ====================== Update order ======================
async function updateOrder(order: OrderModel): Promise<OrderModel> {

  
  const basket: BasketModel = await basketService.getBasket(order.basketId);
  const deliveryMethod: DeliveryMethodModel =
        await deliveryMethodsService.getOneDeliveryMethods(order.deliveryMethodId);
    
  order.finalPrice = basket.totalPrice + deliveryMethod.price;

  // Joi validation
  order.validatePut();

  // Query
  const sql = `UPDATE orders SET
                              clientId = ?,
                              basketId = ?,
                              orderDate = ?,
                              deliveryMethodId = ?,
                              finalPrice = ?,
                              orderStatus = ?
                            WHERE orderId = ?`;

  // Execute:
  const result: OkPacket = await dal.execute(sql, [
    order.clientId,
    order.basketId,
    order.orderDate,
    order.deliveryMethodId,
    order.finalPrice,
    order.orderStatus,
    order.orderId,
  ]);
  
  // Insert to user given Id
  const updatedOrder = await getSingleOrder(order.orderId);
  return updatedOrder;
}

// ====================== Insert order ======================
async function insertOrder(order: OrderModel): Promise<OrderModel> {  

  // Joi validation
  order.validatePost();

  // Query
  const sql = `INSERT INTO orders VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;

  // Execute:
  const result: OkPacket = await dal.execute(sql, [
    order.clientId,
    order.basketId,
    order.orderDate,
    order.deliveryMethodId,
    order.finalPrice,
    order.orderStatus,
  ]);
  
  // Insert to user given Id
  order.orderId = result.insertId;
  const addedOrder = await getSingleOrder(order.orderId);
  return addedOrder;
}

export default {
  getAllOrders,
  getSingleOrder,
  insertOrder,
  updateOrder,
};
