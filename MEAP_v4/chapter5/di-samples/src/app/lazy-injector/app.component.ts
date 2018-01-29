import {Component} from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
        <a [routerLink]="['/']">Home</a>
        <a [routerLink]="['/shipping']">Shipping details</a>
        <a [routerLink]="['/luxury']">Luxury Items</a>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {}
