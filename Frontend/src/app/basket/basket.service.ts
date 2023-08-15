import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Basket } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';
import { DeliveryMethod } from '../shared/models/deliveryMethos';
import { BasketItem } from '../shared/models/basketItem';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketsSource$ = this.basketSource.asObservable();
  private basketItemsSource = new BehaviorSubject<BasketItem[]>([]);
  basketsItemsSource$ = this.basketItemsSource.asObservable();
  basketId: string = '';
  constructor(private http: HttpClient) {}

  getBasket(id: string) {
    this.basketId = id;
    return this.http.get<Basket>(this.baseUrl + 'basket/' + id).subscribe({
      next: (basket) => {
        basket.basketId = id;

        this.basketSource.next(basket);
        this.getBasketItems(id);
      },
      error: () => {
        localStorage.removeItem('basket_id');
      },
    });
  }
  getBasketItems(id: string) {
    return this.http
      .get<BasketItem[]>(this.baseUrl + 'basketItems/' + id)
      .subscribe({
        next: (items) => {
          this.basketItemsSource.next(items);
        },
      });
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: (basket) => {
        this.basketSource.next(basket);
      },
    });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }
  getCurrentBasketItemsValue() {
    return this.basketItemsSource.value;
  }

  async addItemToBasket(item: Product | BasketItem, quantity = 1) {

    const basket = this.getCurrentBasketValue() 
    console.log(basket);
    if(!basket) await this.createBasket();

    if (this.isProduct(item)) item = this.mapProductItemToBasketItem(item);
    const items = this.getCurrentBasketItemsValue();

    const itemIndex = items?.findIndex((x) => {
      return x.productId === item.productId;
    });

    if (itemIndex !== -1) {
      items[itemIndex].quantity += quantity;
      return this.http
        .put<BasketItem>(this.baseUrl + 'basketItems', items[itemIndex])
        .subscribe({
          next: (item) => {
            this.basketItemsSource.next(items);
            this.calcTotalPrice(items);
            this.getBasket(this.basketId);
          },
        });
    } else {
      item.quantity = quantity;
      items.push(item);

      return this.http
        .post<BasketItem>(this.baseUrl + 'basketItems', {
          item: item,
          basketId: this.basketId,
        })
        .subscribe({
          next: (item) => {
            this.basketItemsSource.next(items);
            this.calcTotalPrice(items);
            this.getBasket(this.basketId);
          },
        });
    }
  }

  removeItemFromBasket(id: number, quantity = 1) {
    const items = this.getCurrentBasketItemsValue();
    if (!items) return;
    const item = items.find((x) => x.basketItemId === id);

    if (item) {
      item.quantity -= quantity;
      if (item.quantity === 0) {
        this.http
          .delete(this.baseUrl + 'basketItems/' + item.basketItemId)
          .subscribe({
            next: () => {
              const filteredItems = items.filter((x) => x.basketItemId != id);
              this.basketItemsSource.next(filteredItems);
              this.calcTotalPrice(items);
              this.getBasket(this.basketId);

              console.log(filteredItems.length);
              if (filteredItems.length === 0) {
                this.deleteBasket();
              }
            },
          });
      } else {
        const itemIndex = items?.findIndex((x) => {
          return item.basketItemId === id;
        });
        items[itemIndex] = item;
        this.http.put(this.baseUrl + 'basketItems/', item).subscribe({
          next: (item) => {
            this.basketItemsSource.next(items);
            this.calcTotalPrice(items);
            this.getBasket(this.basketId);
          },
        });
      }
    }

    // if (items.length === 0) this.deleteBasket();
  }

  deleteBasket() {
    const id = this.basketSource.value?.basketId;
    return this.http.delete(this.baseUrl + 'basket/' + id).subscribe({
      next: () => {
        this.deleteLocalBasket();
      },
    });
  }

  deleteLocalBasket() {
    this.basketSource.next(null);
    localStorage.removeItem('basket_id');
  }

  private  async createBasket(): Promise<Basket> {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.basketId);
    this.basketId = basket.basketId;
    this.setBasket(basket);
    return basket;
  }

  private mapProductItemToBasketItem(item: Product): BasketItem {
    return {
      basketItemId: 0,
      productId: item.productId,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.brandName,
      type: item.typeName,
    };
  }

  private calcTotalPrice(items: BasketItem[]) {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    if (this.basketSource.value) {
      this.basketSource.value.totalPrice = total;
    }
  }

  private isProduct(item: Product | BasketItem): item is Product {
    return (item as Product).brandName !== undefined;
  }
}
