import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environments';
import { DeliveryMethod } from '../shared/models/deliveryMethos';
import { BehaviorSubject, map } from 'rxjs';
import { Order } from '../shared/models/order';
import { BasketService } from '../basket/basket.service';
import { AccountService } from '../account/account.service';
import { Basket } from '../shared/models/basket';
import { Client } from '../shared/models/client';
import { OrderStatus } from '../shared/models/orderStatus';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseUrl = environment.apiUrl;
  orderKey = 'order';

  orderSource = new BehaviorSubject<Order | null>(null);
  orderSource$ = this.orderSource.asObservable();
  currentUser: Client | null = null;

  private basket: Basket | null = null;
  private selectedDeliveryMethods: DeliveryMethod | null = null;

  constructor(
    private http: HttpClient,
    private basketService: BasketService,
    private accountService: AccountService
  ) {}

  createOrder() {
    this.basketService.basketsSource$.subscribe({
      next: (basket) => {
        if (basket) this.basket = basket;
      },
    });

    this.accountService.currentUSer$.subscribe((user) => {
      this.currentUser = user;

      if (this.basket && this.currentUser && !this.orderSource.value) {
        const order = {
          clientId: this.currentUser.clientId,
          basketId: this.basket.basketId,
          orderDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
          deliveryMethodId: this.selectedDeliveryMethods?.deliveryMethodId ?? 1,
          finalPrice: this.basket.totalPrice,
          orderStatus: 'Pending',
        };

        this.http.post<Order>(this.baseUrl + 'orders', order).subscribe({
          next: (order) => {
            order = this.formattingOrder(order);
            this.orderSource.next(order);
            localStorage.setItem(this.orderKey, JSON.stringify(order));
          },
        });
      }
    });
  }

  getDeliveryMethods() {
    return this.http
      .get<DeliveryMethod[]>(this.baseUrl + 'deliveryMethods')
      .pipe(
        map((dm) => {
          return dm.sort((a, b) => b.price - a.price);
        })
      );
  }

  setOrderDeliveryMethod(deliveryMethod: DeliveryMethod) {
    this.selectedDeliveryMethods = deliveryMethod;

    const currentOrder = this.orderSource.value;

    if (!currentOrder) return;

    currentOrder.deliveryMethodId = deliveryMethod.deliveryMethodId;
    currentOrder.orderDate = currentOrder.orderDate
      .slice(0, 19)
      .replace('T', ' ');

    console.log(currentOrder);

    return this.http
      .put<Order>(this.baseUrl + 'orders', currentOrder)
      .subscribe({
        next: (order) => {
          order = this.formattingOrder(order);
          this.orderSource.next(order);
          localStorage.setItem(this.orderKey, JSON.stringify(order));
          this.orderSource$.subscribe((x) => console.log(x));
        },
      });
  }

  setOrderStatus(status: OrderStatus) {
    const currentOrder = this.orderSource.value;

    if (!currentOrder) return;

    currentOrder.orderStatus = status;

    return this.http
      .put<Order>(this.baseUrl + 'orders', currentOrder)
      .subscribe({
        next: (order) => {
          order = this.formattingOrder(order);
          this.orderSource.next(order);
          localStorage.setItem(this.orderKey, JSON.stringify(order));
          this.orderSource$.subscribe((x) => console.log(x));
        },
      });
  }

  getCurrentOrder() {
    return this.orderSource.value;
  }

  updateOrder(order: Order) {
    return this.http.put<Order>(this.baseUrl + 'orders', order).subscribe({
      next: (order) => {
        order = this.formattingOrder(order);
        this.orderSource.next(order);
      },
    });
  }

  formattingOrder(order: any): Order {
    order.deliveryMethod = {
      name: order.name,
      deliveryTime: order.deliveryTime,
      description: order.description,
      price: order.price,
    };
    order.client = {
      firstName: order.firstName,
      lastName: order.lastName,
      email: order.email,
      address: {
        country: order.country,
        city: order.city,
        street: order.street,
        zipcode: order.zipcode,
      },
    };
    return order;
  }
}
