import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { SharedModule } from '../shared/shared.module';
import { ContactRoutingModule } from './contact-routing.module';
import { ThanksComponent } from './thanks.component';

@NgModule({
  declarations: [ContactComponent, ThanksComponent],
  imports: [CommonModule, SharedModule, ContactRoutingModule],
})
export class ContactModule {}
