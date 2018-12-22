import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';
import { SearchActionTypes } from './store/actions';


@Component({
  selector: 'nga-root',
  styleUrls: [ './app.component.scss' ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  private readonly searchActionSubscription: Subscription;

  constructor(private readonly actions$: Actions) {
    this.searchActionSubscription = this.actions$
      .pipe(ofType(SearchActionTypes.Search))
      .subscribe(() => this.sidenav.close());
  }

  ngOnDestroy() {
    this.searchActionSubscription.unsubscribe();
  }
}
