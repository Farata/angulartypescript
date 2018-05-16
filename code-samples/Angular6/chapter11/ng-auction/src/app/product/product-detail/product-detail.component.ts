import { Component, Input } from '@angular/core';
import { Product } from '../../shared/services';

@Component({
  selector: 'nga-product-detail',
  styleUrls: [ './product-detail.component.scss' ],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  @Input() product: Product;
}
