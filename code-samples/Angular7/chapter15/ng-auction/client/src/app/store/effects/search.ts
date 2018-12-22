import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Go, Search, SearchActionTypes } from '../actions';


@Injectable()
export class SearchEffects {

  @Effect()
  searchProducts$: Observable<Action> = this.actions$
    .pipe(
      ofType<Search>(SearchActionTypes.Search),
      map(action => action.payload.params),
      map(params => new Go({ commands: [ '/search' ], extras: { queryParams: params }}))
    );

  constructor(private readonly actions$: Actions) {}
}
