import { Component } from '@angular/core';
import { CheckoutService } from 'src/app/checkout/checkout.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent {

  constructor( public checkoutService:CheckoutService){}

  
  
}
