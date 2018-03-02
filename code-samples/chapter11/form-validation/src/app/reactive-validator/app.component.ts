import { Component } from '@angular/core';
import {FormGroup, FormControl, ValidationErrors} from "@angular/forms";


function ssnValidator(control: FormControl): ValidationErrors | null{
  const value: string = control.value || '';
  const valid = value.match(/^\d{9}$/);
  return valid ? null : {ssn: {description: 'SSN is invalid'}};
}

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="myForm">
      SSN: <input type="text" formControlName="socialSecurity" class="social">
      <span [hidden]="!(myForm.get('socialSecurity').dirty 
                        && myForm.hasError('ssn', 'socialSecurity'))"> 
             {{myForm.getError('ssn', 'socialSecurity')?.description}}
      </span>
    </form>
  `,
  styles:[`.social.ng-dirty.ng-invalid 
            { 
              background-color: lightpink;
            }`
          ]
})
export class AppComponent {
  myForm: FormGroup;

  constructor() {
    this.myForm = new FormGroup({
      socialSecurity: new FormControl('', ssnValidator)
    });
  }
}
