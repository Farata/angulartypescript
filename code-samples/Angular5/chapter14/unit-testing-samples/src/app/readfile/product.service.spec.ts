import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import {Product} from './product';

describe('Readfile app ProductService', () => {
  let productService: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ProductService
      ]
    });

    productService = TestBed.get(ProductService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should successfully get products', async(() => {
    const productData: Product[] = [{ "id":"0", "title": "First Product", "price": 24.99 }];
    productService.getProducts()
      .subscribe(
        res => expect(res).toEqual(productData)
      );

    // Emit the data to the subscriber
    let productsRequest = httpMock.expectOne('/data/products.json');
    productsRequest.flush(productData);
  }));

  it('should return error if request for products failed', async( () => {
    const errorType = 'CANNOT_LOAD_PRODUCTS' ;
    productService.getProducts()
      .subscribe(() => {},
          errorResponse => expect(errorResponse.error.type).toEqual(errorType)
      );

    let productsRequest = httpMock.expectOne('/data/products.json');

    productsRequest.error(new ErrorEvent (errorType) );
  }));

  afterEach(() => httpMock.verify());
});
