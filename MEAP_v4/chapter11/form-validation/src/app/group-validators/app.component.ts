import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

function ssnValidator(control: FormControl): {[key: string]: any} {
  const value: string = control.value || '';
  const valid = value.match(/^\d{9}$/);
  return valid ? null : {ssn: true};
}

function equalValidator({value}: FormGroup): {[key: string]: any} {
  const [first, ...rest] = Object.keys(value || {});
  const valid = rest.every(v => value[v] === value[first]);
  return valid ? null : {equal: true};
}

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="formModel" (ngSubmit)="onSubmit()">
      <div>
        Username:
        <input type="text" formControlName="userName">
        <span class="error" [hidden]="!formModel.hasError('required', 'userName')">Username is required</span>
      </div>

      <div>
        SSN:
        <input type="text" formControlName="socialSecurity">
        <span class="error" [hidden]="!formModel.hasError('ssn', 'socialSecurity')">SSN is invalid</span>
      </div>

      <div formGroupName="passwordsGroup">
        <div>
          Password:
          <input type="password" formControlName="password">
          <span class="error" [hidden]="!formModel.hasError('minlength', ['passwordsGroup', 'password'])">Password is too short</span>
        </div>

        <div>
          Confirm password:
          <input type="password" formControlName="pconfirm">
          <span class="error" [hidden]="!formModel.hasError('equal', 'passwordsGroup')">Passwords must be the same</span>
        </div>
      </div>

      <button type="submit" [disabled]="formModel.invalid">Submit</button>
    </form>
  `,
  styles: ['.error {color: red;} ']
})
export class AppComponent {
  formModel: FormGroup;

  constructor(fb: FormBuilder) {  
    this.formModel = fb.group({
    userName: ['', Validators.required], 
    socialSecurity: ['', ssnValidator],
    passwordsGroup: fb.group({
      password: ['', Validators.minLength(5)],
      pconfirm: ['']
    }, {validator: equalValidator}) 
   });
  }

  onSubmit() {
      console.log(this.formModel.value);
  }
}
