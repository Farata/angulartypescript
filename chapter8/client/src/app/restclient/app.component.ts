import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {Component, OnDestroy, OnInit} from "@angular/core";

@Component({
  selector: 'app-root',
  template: `<h1>All Products</h1>
  <ul>
    <li *ngFor="let product of products">
       {{product.title}} {{product.price}}
    </li>
  </ul>
  {{error}}  
  `})
export class AppComponent implements OnInit, OnDestroy{

  products: any[] = [];
  theDataSource: Observable<any[]>;
  productSubscription: Subscription;
  error:string;

  constructor(private httpClient: HttpClient) {
    this.theDataSource = this.httpClient.get<any[]>('/api/products');
  }

  ngOnInit(){
    this.productSubscription = this.theDataSource
      .subscribe(
      data => {
          this.products=data;
      },
      err =>
        this.error = `Can't get products. Got ${err.status} from ${err.url}`
    );
  }

  ngOnDestroy(){
    this.productSubscription.unsubscribe();
  }
}
