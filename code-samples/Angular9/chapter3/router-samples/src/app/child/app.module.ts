import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './home.component';
import { ProductDescriptionComponent } from './product.description.component';
import { ProductDetailComponent } from './product.detail.component';
import { SellerInfoComponent } from './seller.info.component';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailComponent,
    ProductDescriptionComponent, // used in child routes
    SellerInfoComponent          // used in child routes
  ],
  providers:[
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
