import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {AppComponentAsync} from "./app.component.asyncpipe";

@NgModule({
  declarations: [
    AppComponent, AppComponentAsync
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponentAsync]
})
export class AppModule { }
