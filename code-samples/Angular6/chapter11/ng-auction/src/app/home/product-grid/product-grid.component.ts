import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Product } from '../../shared/services';

@Component({
  selector: 'nga-product-grid',
  styleUrls: [ './product-grid.component.scss' ],
  templateUrl: './product-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridComponent {
  @Input() products: Product[];
  readonly columns$: Observable<number>;
  readonly breakpointsToColumnsNumber = new Map([
    [ 'xs', 1 ],
    [ 'sm', 2 ],
    [ 'md', 3 ],
    [ 'lg', 4 ],
    [ 'xl', 5 ],
  ]);

  constructor(private media: ObservableMedia) {
    // If the initial screen size is xs ObservableMedia doesn't emit an event
    // and grid-list rendering fails. Once the following issue is closed, this
    // comment can be removed: https://github.com/angular/flex-layout/issues/388
    this.columns$ = this.media.asObservable()
      .pipe(
        map(mc => <number>this.breakpointsToColumnsNumber.get(mc.mqAlias)),
        startWith(3)
      );
  }
}
