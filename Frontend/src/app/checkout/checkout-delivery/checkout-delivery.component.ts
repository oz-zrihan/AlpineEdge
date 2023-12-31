import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeliveryMethod } from 'src/app/shared/models/deliveryMethos';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss'],
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;

  deliveryMethods: DeliveryMethod[] = [];

  constructor(
    private checkoutService: CheckoutService,
  ) {}

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: async (dm) => {
        this.deliveryMethods = dm;
      }
    });        
  }

  setDeliveryMethod(deliveryMethod: DeliveryMethod) {    
    this.checkoutService.setOrderDeliveryMethod(deliveryMethod);
  }

  isFormValid(){
    return this.checkoutForm?.get('deliveryForm')?.valid
  }

}
