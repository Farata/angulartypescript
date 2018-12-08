import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<input value="0"
                    type="text"
                    [(ngModel)]="temp"
                    placeholder="Enter temperature">
    <button (click)="toggleFormat()">Toggle Format</button>
    <br>In {{ targetFormat }} this temperature is {{ temp | temperature: format | number:'1.1-2' }}` // <2>
})
export class AppComponent {
  temp: number;
  format: string = 'FtoC'; // <3>
  toCelsius: boolean = true;
  targetFormat: string = 'Celsius';

  toggleFormat() { // <4>
    this.toCelsius = !this.toCelsius;
    this.format = this.toCelsius ? 'FtoC' : 'CtoF';
    this.targetFormat = this.toCelsius ?'Celsius' : 'Fahrenheit';
  }
}
