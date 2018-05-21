import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChange
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';
import { Product } from '../../shared/services';
import { getBids, PlaceBid } from '../store';


@Component({
  selector: 'nga-product-detail',
  styleUrls: [ './product-detail.component.scss' ],
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnChanges, OnInit {
  price$: Observable<number>;
  @Input() product: Product = <Product>{};
  private readonly productChange$ = new Subject<Product>();

  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string,
    private readonly store: Store<any>
  ) {
  }

  ngOnInit() {
    this.price$ = combineLatest(
      this.productChange$.pipe(startWith(this.product)),
      this.store.pipe(
        select(getBids),
        startWith<{} | null>(new Map())
      ),
      (product, bids) => {
        const amount = bids[product.id];
        return amount ? amount : product.price;
      }
    );
  }

  ngOnChanges({ product }: { product: SimpleChange }) {
    this.productChange$.next(product.currentValue);
  }

  placeBid(price: number) {
    this.store.dispatch(new PlaceBid({
      productId: this.product.id,
      amount: price
    }));
  }

  urlFor(product: Product): string {
    return `${this.baseUrl}/${product.imageUrl}`;
  }
}
