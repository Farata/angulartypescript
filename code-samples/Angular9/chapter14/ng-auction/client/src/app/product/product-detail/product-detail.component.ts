import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnChanges, OnInit,
  SimpleChange
} from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { startWith} from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';
import { BidMessage, BidService, Product } from '../../shared/services';

@Component({
  selector: 'nga-product-detail',
  styleUrls: [ './product-detail.component.scss' ],
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit, OnChanges {
  private readonly productChange$ = new Subject<Product>();
  latestBids$: Observable<number>;
  @Input() product: Product;

  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string,
    private readonly bidService: BidService) {}

  ngOnInit() {
    this.latestBids$ = combineLatest(
      this.productChange$.pipe(startWith(this.product)),
      this.bidService.priceUpdates$.pipe(startWith<BidMessage|null>(null)),
      (product, bid) =>  bid && bid.productId === product.id ? bid.price : product.price
    );
  }

  ngOnChanges({ product }: { product: SimpleChange }) {
    this.productChange$.next(product.currentValue);
  }

  placeBid(price: number) {
    this.bidService.placeBid(this.product.id, price);
  }

  urlFor(product: Product): string {
    return `${this.baseUrl}/${product.imageUrl}`;
  }
}
