import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  styles: ['.wrapper {background: deeppink;}'],
  template: `
    <div class="wrapper">
     <h2>Parent</h2>
      <div>This div is defined in the Parent's template</div>
      <child>
        <div ><i>Child got this line from parent </i></div>
      </child>
    </div>
  `,
  encapsulation:ViewEncapsulation.ShadowDom
})
export class AppComponent {
}
