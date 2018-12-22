import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BidService } from '../../../shared/services';
import { BidActionTypes, BidUpdate, PlaceBid } from '../actions';


@Injectable()
export class BidEffects {
  @Effect()
  bidUpdates$: Observable<Action> = this.bidService.priceUpdates
    .pipe(
      map(bidMessage => new BidUpdate(bidMessage))
    );

  @Effect({ dispatch: false })
  placeBid$ = this.actions$
    .pipe(
      ofType<PlaceBid>(BidActionTypes.PlaceBid),
      map(action => action.payload),
      tap(({ productId, amount }) => this.bidService.placeBid(productId, amount))
    );

  constructor(
    private readonly actions$: Actions,
    private readonly bidService: BidService
  ) {
  }
}
