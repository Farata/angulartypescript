import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {LoggingInterceptor} from "./logging.interceptor.service";
import {LoggingService} from "./logging.service";
import {ConsoleLoggingService} from "./console.logging.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
              {provide: LoggingService, useClass: ConsoleLoggingService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
