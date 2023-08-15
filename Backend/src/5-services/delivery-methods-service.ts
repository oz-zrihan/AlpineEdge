import { OkPacket } from "mysql";
// Models
import { ResourceNotFoundError } from "../2-models/client-errors";
import DeliveryMethodModel from "../2-models/delivery-method-model";

// Utils
import dal from "../4-utils/dal";

//  ====================== Get all delivery methods ======================
async function getAllDeliveryMethods(): Promise<DeliveryMethodModel[]> {
  //Query
  const sql = `SELECT * FROM DeliveryMethod`;

  // Execute:
  const deliveries = await dal.execute(sql);

  return deliveries;
}
//  ====================== Get one delivery methods ======================
async function getOneDeliveryMethods(deliveryMethodId:number): Promise<DeliveryMethodModel> {
  //Query
  const sql = `SELECT * FROM DeliveryMethod WHERE DeliveryMethodId = ?`;

  // Execute:
  const deliveries = await dal.execute(sql,[deliveryMethodId]);
  const delivery = deliveries[0];

  return delivery;
}

// ====================== Insert delivery method ======================
async function insertDeliveryMethod(
  deliveryMethod: DeliveryMethodModel
): Promise<DeliveryMethodModel> {
  // Delete deliveryMethod id
  delete deliveryMethod.deliveryMethodId;

  // Joi validation
  deliveryMethod.validatePost();

  // Query
  const sql = `INSERT INTO deliveryMethod VALUES(DEFAULT, ?, ?, ?, ?)`;

  // Execute:
  const result: OkPacket = await dal.execute(sql, [
    deliveryMethod.name,
    deliveryMethod.deliveryTime,
    deliveryMethod.description,
    deliveryMethod.price,

    ,
  ]);

  // Insert to deliveryMethod given Id
  deliveryMethod.deliveryMethodId = result.insertId;
  return deliveryMethod;
}

export default {
  getAllDeliveryMethods,
  getOneDeliveryMethods,
  insertDeliveryMethod,
};
