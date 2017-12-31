import { Component, Input } from '@angular/core';
import { Product, ShoppingCartService } from '../../shared/services';

@Component({
  selector: 'ngs-product-details',
  styleUrls: [ './product-details.component.scss' ],
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent {
  @Input() product: Product;
  quantity: number;

  constructor(private shoppingCartService: ShoppingCartService) {}

  addItems() {
    this.shoppingCartService.addItem(this.product.id, this.quantity);
    this.quantity = null; // Reset selected number of items.
  }
}
