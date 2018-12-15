import {Product} from "./product"

export abstract class ProductService{
  abstract getProduct(): Product;
}
