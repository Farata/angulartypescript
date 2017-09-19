import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [`
    .parent { height: 100px; }
    .left   { background-color: cyan; }
    .right  { background-color: yellow; }
  `],
  template: `
    <div fxLayout="row" fxLayout.sm="column" class="parent">
      <div fxFlex="30%" class="left">Left</div>
      <div fxFlex="70%" class="right">Right</div>
    </div>
  `
})
export class AppComponent {}
