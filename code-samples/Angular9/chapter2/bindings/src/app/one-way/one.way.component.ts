import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ name }}</h1>
    <button (click)="changeName()">Change name</button>
  `
})
export class AppComponent {
  name: string = 'Boris Lipsman! Hello from the chapter.Angular9';

  changeName() {
    this.name = 'Bill Smart';
  }
}
