import {MockProductService} from './mock.product.service';
import {ProductService} from './product.service';

export function productServiceFactory (isDev: boolean) {
  if (isDev){
    return new MockProductService();
  }else{
    return new ProductService();
  }
}
