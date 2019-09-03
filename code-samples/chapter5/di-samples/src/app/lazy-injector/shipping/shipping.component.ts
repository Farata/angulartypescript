import { Component, OnInit } from '@angular/core';
import {ShippingService} from './shipping.service';

@Component({
  selector: 'app-shipping',
  template: `<h1>Shipping Component</h1>
             The shipping service returned {{shippingItem}} `,
  styles: []
})
export class ShippingComponent implements OnInit {

  shippingItem: string;

  constructor(private shippingService: ShippingService ) {}

  ngOnInit() {
       this.shippingItem = this.shippingService.getShippingItem();
  }
}





