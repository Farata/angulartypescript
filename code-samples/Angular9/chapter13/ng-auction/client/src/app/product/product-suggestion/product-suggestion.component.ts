import { Component, Inject, Input } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';
import { Product } from '../../shared/services';

@Component({
  selector: 'nga-product-suggestion',
  styleUrls: [ './product-suggestion.component.scss' ],
  templateUrl: './product-suggestion.component.html'
})
export class ProductSuggestionComponent {
  @Input() products: Product[];
  readonly columns$: Observable<number>;
  readonly breakpointsToColumnsNumber = new Map([
    [ 'xs', 2 ],
    [ 'sm', 3 ],
    [ 'md', 5 ],
    [ 'lg', 2 ],
    [ 'xl', 3 ],
  ]);

  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string,
    private readonly media: MediaObserver
  ) {
    // If the initial screen size is xs ObservableMedia doesn't emit an event
    // In the older versions of flex-layout we used ObservableMedia, which is deprecated. 
    // Use MediaObserver instead
    this.columns$ = this.media.media$
      .pipe(
        map(mc => <number>this.breakpointsToColumnsNumber.get(mc.mqAlias)),
        startWith(3)
      );
  }

  urlFor(product: Product): string {
    return `${this.baseUrl}/${product.imageUrl}`;
  }
}
