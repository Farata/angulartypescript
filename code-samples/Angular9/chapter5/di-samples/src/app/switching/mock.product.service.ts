import {Product} from "./product";
import { Injectable } from "@angular/core";

@Injectable()
export class MockProductService {
  getProduct(): Product {
    return new Product('Samsung 7');
  }
}
