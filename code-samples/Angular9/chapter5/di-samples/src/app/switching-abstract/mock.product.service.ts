import {Product} from "./product";
import {ProductService} from "./product.service";
import { Injectable } from "@angular/core";

@Injectable()
export class MockProductService extends ProductService{
  getProduct(): Product {
    return new Product('Samsung 7');
  }
}
