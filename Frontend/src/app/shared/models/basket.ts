import * as cuid from 'cuid';
import { DeliveryMethod } from './deliveryMethos';
import { BasketItem } from './basketItem';



export interface Basket {
  basketId: string;
  basketItems: BasketItem[];
  totalPrice:number;

}

export class Basket implements Basket {
  basketId = cuid();
}
