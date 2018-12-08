import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [],
  template: `
    <h1>Welcome to {{ title }}!!</h1>
    <app-shipping></app-shipping>  
  `
})
export class AppComponent {
  title = 'app';
}
