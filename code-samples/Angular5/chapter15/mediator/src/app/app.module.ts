import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {environment} from '../environments/environment';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {EbayComponent} from './ebay.component';
import {SearchComponent} from './search.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AmazonComponent} from './amazon.component';
import {reducer} from './reducers';
import {SearchEffects} from './effects';
import {ProductService} from './product.service';

@NgModule({
  imports: [ BrowserModule, CommonModule, ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '',        component: EbayComponent},
      {path: 'amazon', component: AmazonComponent}]),

    StoreModule.forRoot({myReducer: reducer}),
    EffectsModule.forRoot([SearchEffects]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
  ],
  declarations: [ AppComponent, EbayComponent, AmazonComponent, SearchComponent],
  providers: [
    ProductService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
