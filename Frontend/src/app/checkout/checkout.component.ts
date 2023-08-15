import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import {Client } from '../shared/models/client';
import { CheckoutService } from './checkout.service';
import { Order } from '../shared/models/order';
import { debounceTime, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  currentUser: Client | null = null;
  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService,
    private accountService: AccountService
    
  ) {}

  ngOnInit(): void {
    this.accountService.currentUSer$.subscribe({
      next: (user) => {
        this.currentUser = user;
      },
    });
  this.getAddressFromValues();
  
  this.checkoutService.orderSource$.subscribe((order) => {
    const savedOrderJson = localStorage.getItem(this.checkoutService.orderKey);
    if (!order && savedOrderJson !== null) {
      const savedOrder:Order = JSON.parse(savedOrderJson);
      const formattedOrder = this.checkoutService.formattingOrder(savedOrder)
      this.checkoutService.orderSource.next(formattedOrder);
      this.checkoutForm.get('deliveryForm')?.patchValue({
        deliveryMethod: savedOrder.deliveryMethodId,
      });
  
    }

    if (!order) {
      this.checkoutService.createOrder();
    }

  });

  }

  checkoutForm = this.fb.group({
    addressForm: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zipcode: ['', Validators.required],
    }),

    deliveryForm: this.fb.group({
      deliveryMethod: [0, Validators.required],   
    }),

    paymentForm: this.fb.group({
      nameOnCard: ['', Validators.required],
      cardNumber: ['', [Validators.required ,this.cardNumberValidator()]], 
      expirationDate: ['', [Validators.required, this.expirationDateValidator()]],
        cvv: ['', [Validators.required, this.cvvValidator()]],
    }),
  });

  getAddressFromValues() {
    
    if(this.currentUser?.address)
    this.checkoutForm.get('addressForm')?.patchValue(this.currentUser?.address);

  }

// Card number validator function
   private cardNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; 
      }
  
      const cardPattern = /^\d{16}$/;
  
      if (!cardPattern.test(control.value)) {
        return { invalidCardNumber: true };
      }
      
      control.markAsTouched()
      return null; 
      
    };
  }


// CVV number validator function
   private cvvValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; 
      }
  
      const cvvPattern = /^\d{3,4}$/;
  
      if (!cvvPattern.test(control.value)) {
        return { invalidCVV: true }; 
      }
  
      return null; 
    };
  }

// Date validator function
 private expirationDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; 
    }

    const expirationDate = new Date(control.value);
    const currentDate = new Date();

    if (expirationDate <= currentDate) {
      return { expired: true }; 
    }

    return null; 
  };
}

}
