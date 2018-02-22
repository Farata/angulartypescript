import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {Product1Component} from "./product1.component";
import {Product2Component} from "./product2.component";
import {RealProductService} from "./real.product.service";
import {ProductService} from "./product.service";

@NgModule({
  imports:      [ BrowserModule],
  providers: [{provide: ProductService, useClass: RealProductService}],
  declarations: [ AppComponent, Product1Component, Product2Component],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
