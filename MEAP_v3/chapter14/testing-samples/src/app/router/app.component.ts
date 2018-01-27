import {Component} from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
        <a [routerLink]="['/']">Home</a>
        <a class="product" [routerLink]="['/product', productId]">Product Detail</a> 
        <router-outlet></router-outlet>
    `,
  styles: ['.product {color: black}']
})
export class AppComponent {
  productId = 1234; // as if the product ID was selected from a list of product
}
