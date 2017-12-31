import {MockProductService} from './mock.product.service';
import {ProductService} from './product.service';

export function productServiceFactory (isProd: boolean) {
  if (isProd){
    return new MockProductService();   // Samsung7
  }else{
    return new ProductService();    // iPhone7
  }
}
