import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {ChildComponent} from "./child.component";
//import {ChildComponent} from "./child.component-docheck";

@NgModule({
  imports:      [ BrowserModule, FormsModule],
  declarations: [ AppComponent, ChildComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

