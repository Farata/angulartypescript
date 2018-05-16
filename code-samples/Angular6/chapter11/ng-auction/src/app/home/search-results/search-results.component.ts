import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product, ProductService } from '../../shared/services';

@Component({
  selector: 'nga-search',
  styleUrls: [ './search-results.component.scss' ],
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent {
  readonly products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.products$ = this.route.queryParams.pipe(
      switchMap(queryParams => this.productService.search(queryParams))
    );
  }
}
