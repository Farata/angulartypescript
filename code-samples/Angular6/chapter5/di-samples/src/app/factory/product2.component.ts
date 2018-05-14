import {Component} from '@angular/core';
import {Product} from './product';
import {ProductService} from './product.service';

@Component({ 
  selector: 'product2',  
  template: 'Product 2: {{product.title}}' 
})
 export class Product2Component { 
  product: Product;  
  constructor(productService: ProductService) { 
    this.product = productService.getProduct(); 
  } 
}
