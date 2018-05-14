import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <div class="main">
              <h2>App component</h2>
    
              <search></search>  <b><-- Search component</b>
              <p>
              
              <a [routerLink]="['/']">eBay</a>
              <a [routerLink]="['/amazon']">Amazon</a>
              <router-outlet></router-outlet>
              </div>`,
  styles: ['.main {background: yellow}']
})

export class AppComponent{
}
