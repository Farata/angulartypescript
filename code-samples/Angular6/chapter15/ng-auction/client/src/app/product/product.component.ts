import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Product } from '../shared/services';
import { getSelectedProduct, getSuggestedProducts, LoadById, LoadSuggested } from './store';


@Component({
  selector: 'nga-product',
  styleUrls: [ './product.component.scss' ],
  templateUrl: './product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnDestroy {
  readonly product$: Observable<Product>;
  readonly suggestedProducts$: Observable<Product[]>;
  private readonly routeParamsSubscription: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<any>
  ) {
    this.product$ = this.store.pipe(select(getSelectedProduct));
    this.suggestedProducts$ = this.store.pipe(select(getSuggestedProducts));
    this.routeParamsSubscription = this.route.paramMap
      .pipe(
        map(params => parseInt(params.get('productId') || '', 10)),
        filter(productId => !!productId)
      )
      .subscribe(productId => {
        this.store.dispatch(new LoadById({ productId }));
        this.store.dispatch(new LoadSuggested({ productId }));
      });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
