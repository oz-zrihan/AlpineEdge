import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from '../shop/shop-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, ShopRoutingModule],
  exports: [HomeComponent],
})
export class HomeModule {}
