import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { SEARCH, SearchAction, SearchSuccessAction } from './actions';
import {ProductService} from './product.service';



@Injectable()
export class SearchEffects {
  @Effect()
  search$ = this.actions$
    .ofType(SEARCH)
    .map((action: SearchAction) => action.payload)
    .switchMap(({ searchQuery }) => this.generator.getProducts(searchQuery))
    .map(searchResults => new SearchSuccessAction({ searchResults }));

  constructor(
    private actions$: Actions,
    private generator: ProductService
  ) {}
}
