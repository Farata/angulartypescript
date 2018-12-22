import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../shared/services';
import { State } from '../store';
import { SearchProducts } from '../store/actions';
import { getProductsData } from '../store/reducers';


@Component({
  selector: 'nga-search',
  styleUrls: [ './search.component.scss' ],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnDestroy {
  readonly products$: Observable<Product[]>;
  private readonly paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) {
    this.products$ = this.store.pipe(select(getProductsData));
    this.paramsSubscription = this.route.queryParams.subscribe(
      params => this.store.dispatch(new SearchProducts({ params }))
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
