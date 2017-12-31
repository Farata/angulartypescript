import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {OrderProcessorComponent} from "./order.componenent";

@NgModule({
  declarations: [
    AppComponent, OrderProcessorComponent
  ],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
