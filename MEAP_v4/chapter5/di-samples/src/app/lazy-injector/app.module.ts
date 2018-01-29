import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ShippingModule} from './shipping/shipping.module';

export function shippingModuleLoader() {
  return ShippingModule;
}

@NgModule({
  imports: [ BrowserModule, ShippingModule,
    RouterModule.forRoot([
      {path: '',        component: HomeComponent},
      {path: 'shipping', loadChildren: shippingModuleLoader},
      {path: 'luxury', loadChildren: './lazymodule/luxury.module#LuxuryModule'} ]
      )
  ],
  declarations: [ AppComponent, HomeComponent],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}

