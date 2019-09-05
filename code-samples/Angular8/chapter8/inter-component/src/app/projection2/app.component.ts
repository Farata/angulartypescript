import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  styles: ['.wrapper {background: deeppink;}'],
  template: `
    <div class="wrapper">
     <h2>Parent</h2>
      <div>This div is defined in the Parent's template</div>
      <child>
        <div class="header" ><i>Child got this header from parent {{todaysDate}}</i></div>
        <div class="footer"><i>Child got this footer from parent</i></div>
      </child>
    </div>
  `
})
export class AppComponent {
  todaysDate = new Date().toLocaleDateString();
}
