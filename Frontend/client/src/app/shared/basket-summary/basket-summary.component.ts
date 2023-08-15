import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { environment } from 'src/environments/environments';
import { BasketItem } from '../models/basketItem';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
})
export class BasketSummaryComponent {
  @Output() addItem = new EventEmitter<BasketItem>();
  @Output() removeItem = new EventEmitter<{ id: number; quantity: number }>();
  @Input() isBasket: boolean = true;

  baseImageUrl = environment.pictureUrl;

  constructor(public basketService: BasketService) {}

  addBasketItem(item: BasketItem) {
    this.addItem.emit(item);
  }

  removeBasketItem(id: number, quantity = 1) {
    this.removeItem.emit({ id, quantity });
  }
}
