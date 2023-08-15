import { Basket } from './basket';
import { Client } from './client';
import { DeliveryMethod } from './deliveryMethos';

export interface Order {
   orderId?: number;
   clientId: number;
   client?: Client;
   basketId: string;
   basket?: Basket;
   orderDate: string;
   deliveryMethodId: number;
   deliveryMethod?: DeliveryMethod;
   finalPrice: number;
   orderStatus: string;
}
