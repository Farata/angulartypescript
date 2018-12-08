import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TemperaturePipe } from './temperature.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    TemperaturePipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
