import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  template: ` <div class="main">
              <app-search></app-search>
              <p>
              <a [routerLink]="['/']">eBay</a>
              <a [routerLink]="['/amazon']">Amazon</a>
              <router-outlet></router-outlet>
              </div>`,
  styles: ['.main {background: yellow}']
})

export class AppComponent {

  constructor(store: Store<any>) {
    store
      .select(state => state.myRouterReducer)
      .subscribe(routerState => console.log('The router state: ', routerState));

  }
}
