import { OkPacket } from "mysql";
// Models
import { ResourceNotFoundError, UnauthorizedError, ValidationError } from "../2-models/client-errors";
import CredentialsModel from "../2-models/credentials-model";
import ClientModel from "../2-models/client-model";

// Utils
import cyber from "../4-utils/cyber";
import dal from "../4-utils/dal";
import AddressModel from "../2-models/address-model";

// ====================== Get current user: ======================

async function getCurrentUser(email: string): Promise< ClientModel > {
  // Create query:
  const sql = `SELECT * From clients
                LEFT JOIN address ON clients.addressId = address.addressId
                WHERE email =?`;

  // Execute:
  const rows = await dal.execute(sql, [email]);

  if (rows.length === 0) {
    // No client found with the given email, return null or handle the error accordingly
    return null;
  }

  // Extract the client data from the first element of the rows array
   const client:ClientModel = rows[0];

  // Create token:
  const token = cyber.createToken(client);
  client.token = token;

  delete client.password

  // Return client Dto and full client:
  return  client ;
}

// ====================== Register new user: ======================
async function register(client: ClientModel): Promise< ClientModel > {

  // Joi Validation...
  client.validatePost();

  // Is username taken:
  const isTaken = await isEmailTaken(client.email);
  if (isTaken) throw new ValidationError(`Email ${client.email} already taken`);

  // Hash password
  client.password = cyber.hashPassword(client.password);
  
  // Create query:
  const sql = `INSERT INTO clients VALUES(DEFAULT,?,?,?,?,?)`;

  // Execute:
  const result: OkPacket = await dal.execute(sql, [
    client.firstName,
    client.lastName,
    client.email,
    client.password,
    client.addressId=null
  ]);

  // Set back auto-increment id:
  client.clientId = result.insertId;

  // Create token:
  const token = cyber.createToken(client);
  delete client.password

  client.token = token;
  // Return token:
  return client;
}

// ====================== Check if user name is already taken ======================
async function isEmailTaken(email: string): Promise<boolean> {
  // Create query:
  const sql = `SELECT EXISTS(SELECT * FROM clients WHERE email = ?) AS isTaken`;

  // Execute:
  const arr = await dal.execute(sql, [email]);

  // Get is taken value:
  const isTaken: number = arr[0].isTaken;

  // Return true if username taken:
  return isTaken === 1;
}

// ====================== Login: ======================
async function login(credentials: CredentialsModel): Promise<ClientModel> {
  // Joi Validation...
  credentials.validatePost();

  // Hash password
  const hashedPassword = cyber.hashPassword(credentials.password);
  // credentials.password = cyber.hashPassword(credentials.password);
console.log(hashedPassword);

  // Query:
  const sql = `SELECT *
                FROM clients
                LEFT JOIN address ON clients.addressId = address.addressId
                WHERE clients.email = ?
                AND clients.password = ? ;`;

  // Execute:
  const clients = await dal.execute(sql, [
    credentials.email,
    hashedPassword,
  ]);

  // Extract client:
  const client:ClientModel = clients[0];

  // If client not exist:
  if (!client) throw new UnauthorizedError("Incorrect email or password");

  // Create token:
  const token = cyber.createToken(client);
  client.token = token;

  delete client.password

  // Return token:
  return client;
}

async function postAddress(address: AddressModel, clientId:number): Promise<AddressModel>{
console.log("post address");
console.log(address);

  address.validatePost();

    const insertSql = `INSERT INTO address VALUES(DEFAULT,?,?,?,?)`

    const result:OkPacket = await dal.execute(insertSql, [
      address.country,
      address.city,
      address.street,
      address.zipcode,
    ]);

    address.addressId = result.insertId;

    const clientSql = 'UPDATE clients SET addressId = ? WHERE clientId = ?'

    const clientResult:OkPacket = await dal.execute(clientSql, [
      address.addressId,
      clientId
    ]);

     // Validate execution
     if (clientResult.affectedRows === 0) {
      throw new ResourceNotFoundError(clientId);
    }
  
  return address;
}
async function updateAddress(address: AddressModel, addressId:number): Promise<AddressModel>{
console.log("put address");
console.log(address);

  address.validatePut();

  if(addressId){
    const sql = `UPDATE address SET country = ?, city = ?, street = ?, zipcode = ? WHERE addressId =?`

    const result:OkPacket = await dal.execute(sql, [
      address.country,
      address.city,
      address.street,
      address.zipcode,
      addressId
    ]);

    // Validate execution
    if (result.affectedRows === 0) {
      throw new ResourceNotFoundError(addressId);
    }
  }
  
  return address;
}

export default {
  getCurrentUser,
  isEmailTaken,
  register,
  login,
  postAddress,
  updateAddress
};
