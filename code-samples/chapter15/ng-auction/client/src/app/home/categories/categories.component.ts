import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';

import { Product, ProductService } from '../../shared/services';

@Component({
  selector: 'nga-categories',
  styleUrls: [ './categories.component.scss' ],
  templateUrl: './categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {
  readonly categories$: Observable<string[]>;
  readonly products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.productService.getAllCategories().pipe(
      map(categories => ['all', ...categories]));

    this.products$ = this.route.params.pipe(
      switchMap(({ category }) => this.getCategory(category)));
  }

  private getCategory(category: string): Observable<Product[]> {
    return category.toLowerCase() === 'all'
      ? this.productService.getAll()
      : this.productService.getByCategory(category.toLowerCase());
  }
}
