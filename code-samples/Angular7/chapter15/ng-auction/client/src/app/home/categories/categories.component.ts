import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../shared/services';
import {
  getCategoriesData,
  getProductsData,
  LoadCategories,
  LoadProducts,
  LoadProductsByCategory,
  State
} from '../store';

@Component({
  selector: 'nga-categories',
  styleUrls: [ './categories.component.scss' ],
  templateUrl: './categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnDestroy {
  readonly categories$: Observable<string[]>;
  readonly products$: Observable<Product[]>;
  private readonly productsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) {
    this.products$ = this.store.pipe(select(getProductsData));
    this.categories$ = this.store.pipe(
      select(getCategoriesData),
      map(categories => [ 'all', ...categories ])
    );

    this.productsSubscription = this.route.params.subscribe(
      ({ category }) => this.getCategory(category)
    );

    this.store.dispatch(new LoadCategories());
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  private getCategory(category: string): void {
    return category.toLowerCase() === 'all'
      ? this.store.dispatch(new LoadProducts())
      : this.store.dispatch(new LoadProductsByCategory({ category: category.toLowerCase() }));
  }
}
