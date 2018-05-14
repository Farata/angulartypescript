import {Product} from "./product";
import {ProductService} from "./product.service";

export class MockProductService extends ProductService{
  getProduct(): Product {
    return new Product('Samsung 7');
  }
}
