import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import { Client } from 'src/app/shared/models/client';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements OnInit{
  @Input() checkoutForm?: FormGroup;
  @Input() currentUser?: Client;
  order:Order | null = null;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit (): void
  {
    this.checkoutService.orderSource$.subscribe({
      next: (order) => this.order = order
    })
  }

  async submitOrder() {
    
    this.toastr.success('Payment Received');
    this.basketService.deleteLocalBasket();
    this.basketService.deleteBasket();
    localStorage.removeItem(this.checkoutService.orderKey);
    if (this.order){
      const navigationExtras: NavigationExtras = { state: this.order };
      this.router.navigate(['checkout/success'], navigationExtras);  
    }
  }

  isFormValid() {
    return this.checkoutForm?.get('paymentForm')?.valid;
  }
}
