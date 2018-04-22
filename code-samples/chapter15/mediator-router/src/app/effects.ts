import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {SearchActionTypes, SearchAction, SearchSuccessAction, SearchFailureAction} from './actions';
import {ProductService} from './product.service';

@Injectable()
export class SearchEffects {

  @Effect()
  loadProducts$ = this.actions$
    .pipe(
      ofType(SearchActionTypes.Search),
      map((action: SearchAction) => action.payload),
      switchMap(({ searchQuery }) => this.productService.getProducts(searchQuery)
        .pipe(map(searchResults => new SearchSuccessAction({searchResults})),
          catchError(errorMessage => of(new SearchFailureAction({errorMessage})))
        )
      )
    );

  @Effect({ dispatch: false })
  logNavigation$ =
    this.actions$.pipe(
      ofType('ROUTER_NAVIGATION'),
      tap((action: any) => {
        console.log('The router action in effect:', action.payload);
      })
    );

  constructor(private actions$: Actions,
              private productService: ProductService) {}
}
