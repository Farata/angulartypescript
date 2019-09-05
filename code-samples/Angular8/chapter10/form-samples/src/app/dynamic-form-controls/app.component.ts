import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="formModel" (ngSubmit)="onSubmit()">
      <label>Emails</label>
      <button type="button" (click)="addEmail()">Add Email</button>
      <ul formArrayName="emails">
        <li *ngFor="let e of emailsFormArray.controls; let i=index">
          <input [formControlName]="i">
        </li>
      </ul>
      <button type="submit">Submit</button>
    </form>
    <hr>
    <label>Form Value:</label>
    <pre>{{ value }}</pre>
  `
})
export class AppComponent {
  formModel = new FormGroup({
    emails: new FormArray([
      new FormControl()
    ])
  });

  get emailsFormArray() {
    return this.formModel.get('emails') as FormArray;
  }

  get value() {
    return JSON.stringify(this.formModel.value, null, 4); // indent with 4 spaces for readability
  }

  addEmail() {
    const emails = this.emailsFormArray;
    emails.push(new FormControl());
  }

  onSubmit() {
    console.log(this.formModel.value);
  }
}
