import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  baseImageUrl = environment.pictureUrl;

  product?: Product;
  quantity = 1;
  quantityInBasket = 0;
  isDisabled: boolean = this.quantity === 0 ? true : false;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id)
      this.shopService.getProduct(+id).subscribe({
        next: (product) => {
          this.product = product;
          this.bcService.set('@productDetails', this.product.name);
          this.basketService.basketsItemsSource$.pipe(take(1)).subscribe({
            next: (items) => {
              const item = items.find((x) => x.productId === +id);
              if (item) {
                this.quantity = item.quantity;
                this.quantityInBasket = item.quantity;
              }
            },
          });
        },
        error: (error) => console.log(error),
      });
  }

  incrementQuantity() {
    this.quantity++;
    if (this.quantity > 0) {
      this.isDisabled = false;
    }
  }

  decrementQuantity() {
    this.quantity--;
    if (this.quantity === 0) {
      this.isDisabled = true;
    }
  }

  updateBasket() {
    if (this.product) {
      if (this.quantity > this.quantityInBasket) {
        const itemsToAdd = this.quantity - this.quantityInBasket;
        this.quantityInBasket += itemsToAdd;
        this.basketService.addItemToBasket(this.product, itemsToAdd);
      } else {
        const itemToRemove = this.quantityInBasket - this.quantity;
        this.quantityInBasket -= itemToRemove;
        this.basketService.basketsItemsSource$.pipe(take(1)).subscribe({
          next: (items) => {
            const item = items.find(
              (x) => x.productId === this.product?.productId
            );
            if (item)
              this.basketService.removeItemFromBasket(
                item?.basketItemId,
                itemToRemove
              );
          },
        });
      }
    }
  }

  get buttonText() {
    return this.quantityInBasket === 0 ? 'Add to basket' : 'Updated basket';
  }
}
