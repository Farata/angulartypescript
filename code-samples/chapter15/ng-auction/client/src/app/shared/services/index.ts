import { Provider } from '@angular/core';
import { RouterStateSerializer } from '@ngrx/router-store';
import { BidService } from './bid.service';
import { ProductService, HttpProductService } from './product.service';
import { RouterStateSerializerService } from './router-state-serializer.service';

export { BidMessage, BidService } from './bid.service';
export { Product, ProductSearchParams, ProductService } from './product.service';
export { RouterStateSerializerService, RouterStateUrl } from './router-state-serializer.service';

export const SHARED_SERVICES: Provider[] = [
  { provide: BidService, useClass: BidService },
  { provide: ProductService, useClass: HttpProductService },
  { provide: RouterStateSerializer, useClass: RouterStateSerializerService }
];
