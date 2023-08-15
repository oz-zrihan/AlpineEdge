import { Component } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basketItem';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {

  items: BasketItem[] = [];
  constructor(
    public basketService: BasketService,
    public accountService: AccountService
  ) {}

  getCount() {
    this.basketService.basketsItemsSource$.subscribe((basketItems)=> {
      if(basketItems) this.items = basketItems      
    }
    )
    
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
