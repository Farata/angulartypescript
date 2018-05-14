import {Product} from "./product"
import {ProductService} from "./product.service";


export class RealProductService extends ProductService{
  getProduct(): Product {
    // Code making an HTTP request to get actual product details could go here
    return new Product('iPhone 7');
  }
}
