import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ProductService } from '../../../shared/services';
import {
  LoadById,
  LoadByIdFailure,
  LoadByIdSuccess,
  LoadSuggestedSuccess,
  ProductActionTypes
} from '../actions';


@Injectable()
export class ProductEffects {
  @Effect()
  loadProductById$: Observable<Action> = this.actions$
    .pipe(
      ofType<LoadById>(ProductActionTypes.LoadById),
      map(action => action.payload.productId),
      switchMap(productId => this.productService.getById(productId)),
      map(product => new LoadByIdSuccess({ product })),
      catchError(error => of(new LoadByIdFailure({ error })))
    );

  @Effect()
  loadSuggested$: Observable<Action> = this.actions$
    .pipe(
      ofType(ProductActionTypes.LoadSuggested),
      switchMap(() => this.productService.getAll()),
      map(products => new LoadSuggestedSuccess({ products })),
      catchError(error => {
        // Error with loading suggested products doesn't break user's workflow,
        // so we basically ignore it and return an empty array.
        console.error(`Error while suggested products: ${error}`);
        return of(new LoadSuggestedSuccess({ products: [] }));
      })
    );

  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService
  ) {
  }
}
