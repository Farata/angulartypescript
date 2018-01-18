import {MockProductService} from './mock.product.service';
import {ProductService} from './product.service';

export function productServiceFactory (isProd: boolean) {
  if (isProd){
    return new ProductService();   // iPhone7
  }else{
    return new MockProductService();     // Samsung7
  }
}
