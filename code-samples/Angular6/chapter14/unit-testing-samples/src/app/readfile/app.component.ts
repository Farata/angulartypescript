import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Component} from "@angular/core";
import {ProductService} from './product.service';
import {Product} from './product';

@Component({
  selector: 'app-root',
  template: `<h1>Products</h1>
  <ul>
    <li *ngFor="let product of products$ | async">
      {{product.title }}: {{product.price | currency}}
    </li>
  </ul>
  `,
  providers: [ProductService]
})
export class AppComponent{

  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {

    this.products$ = this.productService.getProducts();
  }
}
