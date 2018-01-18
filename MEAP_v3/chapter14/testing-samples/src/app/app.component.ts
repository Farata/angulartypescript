import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<button>Slowly add 2 and 4</button>
             2+4 = {{result}}`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  result: number;
}
