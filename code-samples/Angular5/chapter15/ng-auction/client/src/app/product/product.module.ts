import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductDetailComponent } from './product-detail';
import { ProductSuggestionComponent } from './product-suggestion';

import { ProductComponent } from './product.component';
import { BidEffects, ProductEffects, reducers } from './store';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: '', component: ProductComponent }
    ]),

    StoreModule.forFeature('productPage', reducers),
    EffectsModule.forFeature([ BidEffects, ProductEffects ]),

    MatButtonModule,
    MatGridListModule
  ],
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductSuggestionComponent
  ]
})
export class ProductModule {
}
