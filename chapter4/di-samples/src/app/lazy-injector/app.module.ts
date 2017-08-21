import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home.component";
import {ProductDetailComponent} from "./product.detail.component";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";

@NgModule({
  imports: [ BrowserModule,
    RouterModule.forRoot([
      {path: '',        component: HomeComponent},
      {path: 'product', component: ProductDetailComponent},

      {path: 'luxury', loadChildren: './lazymodule/luxury.module#LuxuryModule'} ]
      )
  ],
  declarations: [ AppComponent, HomeComponent, ProductDetailComponent],
  providers:[{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}
