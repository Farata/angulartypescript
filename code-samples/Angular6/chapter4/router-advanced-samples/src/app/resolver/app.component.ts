import {Component} from '@angular/core';
import {
  Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
    <a [routerLink]="['/']">Home</a>&nbsp;
    <a [routerLink]="['mydata']">Data</a>
    <router-outlet></router-outlet>
    <div *ngIf="isNavigating">
      Loading...
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </div>
  `
})
export class AppComponent {

  isNavigating = false;

  constructor (private router: Router){
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart){
          this.isNavigating=true;
          console.log("Navigation started");
        }

        if (event instanceof NavigationEnd) {
          // || event instanceof NavigationError || event instanceof NavigationCancel){
          this.isNavigating=false;
          console.log("Navigation ended");
        }
      }
    );
  }
}
