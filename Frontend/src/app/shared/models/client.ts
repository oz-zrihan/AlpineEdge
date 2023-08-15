import { Address } from "./address";

export interface Client {
  clientId: number;
  addressId: number;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  token: string;
}

