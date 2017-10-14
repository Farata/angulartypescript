import { Component } from '@angular/core';
import {FormGroup, FormControl, ValidationErrors} from "@angular/forms";


function ssnValidator(control: FormControl): ValidationErrors | null{
  const value: string = control.value || '';
  const valid = value.match(/^\d{9}$/);
  return valid ? null : {ssn: true};
}

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="myForm">
      SSN: <input type="text" formControlName="socialSecurity">
           <span [hidden]="!myForm.hasError('ssn', 'socialSecurity')">SSN is invalid</span>
    </form>
  `
})
export class AppComponent {
  myForm: FormGroup;

  constructor() {
    this.myForm = new FormGroup({
      'socialSecurity': new FormControl('', ssnValidator)
    });
  }
}
