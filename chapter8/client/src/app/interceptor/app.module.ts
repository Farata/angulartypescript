import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {FirstInterceptor} from "./first.interceptor.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [[ { provide: HTTP_INTERCEPTORS, useClass: FirstInterceptor, multi: true } ]],
  bootstrap: [AppComponent]
})
export class AppModule { }
