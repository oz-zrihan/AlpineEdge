import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/order';
import { OrdersService } from './orders.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environments';
import { CheckoutService } from '../checkout/checkout.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit{
  baseImageUrl = environment.pictureUrl;

  order?:Order;

  constructor(private activatedRoute: ActivatedRoute, private ordersService:OrdersService, private checkoutService:CheckoutService){}
  ngOnInit (): void
  {
    this.getOrder()
  }

  getOrder(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    

    if(id){
      this.ordersService.getOrder(+id).subscribe({
        next: order => {
          console.log(order);
          
          order = this.checkoutService.formattingOrder(order)
          this.order = order;
        }
      })
    }
  }

 



}
