import { Injectable } from '@angular/core';

@Injectable()
export class ShippingService {

  getShippingItem() {
    return "I'm the shipping service from the shipping module";
  }
}
