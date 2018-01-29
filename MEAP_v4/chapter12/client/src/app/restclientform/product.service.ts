import { HttpClient} from '@angular/common/http';
import { Injectable} from "@angular/core";
import { Observable} from "rxjs/Observable";

@Injectable()
export class ProductService{

  constructor( private http: HttpClient){}

  getProductByID(productID: string): Observable<any>{
    return this.http.get(`api/products/${productID}`);
  }
}
