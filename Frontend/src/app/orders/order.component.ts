import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/order';
import { OrdersService } from './orders.service';
import { BehaviorSubject } from 'rxjs';
import { CheckoutService } from '../checkout/checkout.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private ordersService: OrdersService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrdersList().subscribe({
      next: (ordersList) => {
        ordersList = ordersList.map((o) =>
          this.checkoutService.formattingOrder(o)
        );
        this.orders = ordersList;
      },
    });
  }
}
