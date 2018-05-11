import { Component } from '@angular/core';
import { Product, ProductService } from "./product.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  template: `
    <ul>
      <li *ngFor="let product of products$ | async">
        {{product.title }} {{product.price | currency: "USD"}}
      </li>
    </ul>
  `
})
export class AppComponent {

  products$: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }
}
