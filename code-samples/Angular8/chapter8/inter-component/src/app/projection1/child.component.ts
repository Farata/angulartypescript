import {Component, ViewEncapsulation} from "@angular/core";

@Component({
  selector: 'child',
 styles: ['.wrapper {background: lightgreen;}'],
  template: `
    <div class="wrapper">
     <h2>Child</h2>
      <div>This content is defined in child</div><p>
      <ng-content></ng-content>
    </div>
  `,
  encapsulation:ViewEncapsulation.Native
})
export class ChildComponent {}
