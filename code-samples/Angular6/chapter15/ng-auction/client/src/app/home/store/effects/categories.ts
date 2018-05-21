import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { ProductService } from '../../../shared/services';
import { CategoriesActionTypes, LoadCategoriesSuccess } from '../actions';


@Injectable()
export class CategoriesEffects {
  @Effect()
  loadCategories$: Observable<Action> = this.actions$
    .pipe(
      ofType(CategoriesActionTypes.Load),
      mergeMap(() => this.productService.getAllCategories()),
      map(categories => new LoadCategoriesSuccess({ categories })),
      catchError(error => {
        // In case of an error there is not much we can do. So we just
        // emit a success action with an empty array. The ALL category
        // is always present, so users will be able to see the products.
        console.error(`Error while loading categories: ${error}`);
        return of(new LoadCategoriesSuccess({ categories: [] }));
      })
    );

  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService
  ) {
  }
}
