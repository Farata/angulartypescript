import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingComponent } from './shipping.component';
import {ShippingService} from './shipping.service';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
             {path: 'shipping', component: ShippingComponent}
     ]) ],
  declarations: [ShippingComponent],
  providers: [ShippingService]
})
export class ShippingModule { }







