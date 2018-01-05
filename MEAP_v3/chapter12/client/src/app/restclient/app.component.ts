import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {Component, OnInit} from "@angular/core";

interface IProduct {
  id: number,
  title: string,
  price: number
}

@Component({
  selector: 'app-root',
  template: `<h1>All Products</h1>
  <ul>
    <li *ngFor="let product of products">
       {{product.title}}: {{product.price | currency}}
    </li>
  </ul>
  {{error}}  
  `})
export class AppComponent implements OnInit{

  products: IProduct[] = [];
  theDataSource: Observable<IProduct[]>;
  productSubscription: Subscription;
  error: string;

  constructor(private httpClient: HttpClient) {
    this.theDataSource = this.httpClient.get<IProduct[]>('http://localhost:8000/api/products');
  }

  ngOnInit(){
    this.productSubscription = this.theDataSource
      .subscribe(
      data => {
          this.products=data;
      },
        (err: HttpErrorResponse) =>
        this.error = `Can't get products. Got ${err.message}`
    );
  }
}
