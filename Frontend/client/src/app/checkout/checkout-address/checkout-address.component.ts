import { Address } from 'src/app/shared/models/address';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { Client } from 'src/app/shared/models/client';
import { take } from 'rxjs';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
})
export class CheckoutAddressComponent {
  @Input() checkoutForm?: FormGroup;
  @Input() currentUser?: Client | null;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  saveUserAddress() {
    if (
      this.checkoutForm?.get('addressForm')?.valid &&
      this.checkoutForm.get('addressForm')?.dirty
    ) {
      const address = this.checkoutForm?.get('addressForm')?.value;
      const clientAddress = this.currentUser?.address;
      console.log(address, clientAddress);

      if (address && clientAddress) {
        this.accountService
          .updatedUserAddress(address, clientAddress.addressId)
          .subscribe({
            next: (updatedAddress) => {
              this.toastr.success('Address Saved Successfully');
              this.checkoutForm
                ?.get('addressForm')
                ?.reset(this.checkoutForm?.get('addressForm')?.value);

              // Update the currentUserSource with the updated address
              this.updateUserAddressInSource(updatedAddress);
            },
          });
      } else if (address && !clientAddress && this.currentUser?.clientId) {
        this.accountService
          .postUserAddress(address, this.currentUser?.clientId)
          .subscribe({
            next: (addedAddress) => {
              this.toastr.success('Address Saved Successfully');
              this.checkoutForm
                ?.get('addressForm')
                ?.reset(this.checkoutForm?.get('addressForm')?.value);

              // Update the currentUserSource with the updated address
              this.updateUserAddressInSource(addedAddress);
            },
          });
      }
    }
  }

  updateUserAddressInSource(newAddress: Address) {
    this.accountService.currentUSerSource
      .pipe(take(1))
      .subscribe((currentUser) => {
        if (currentUser) {
          currentUser.address = newAddress;
          this.accountService.currentUSerSource.next(currentUser);
        }
      });
  }

  isFormValid() {
    return this.checkoutForm?.get('addressForm')?.valid;
  }
}
