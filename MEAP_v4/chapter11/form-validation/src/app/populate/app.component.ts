import { Component } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="myFormModel">
      <div>Product ID: <input type="text" formControlName="id"></div>
      <div>Description: <input type="text" formControlName="description"></div>
      <div>Seller:      <input type="text" formControlName="seller"></div>
    </form>
    <button (click)="updateEntireForm()">Populate</button>
    <button (click)="updatePartOfTheForm()">Update Description</button>
    <button (click)="myFormModel.reset()">Reset</button>
  `
})
export class AppComponent {
  myFormModel: FormGroup;

  constructor() {
    this.myFormModel = new FormGroup({
      id: new FormControl(''),
      description: new FormControl(''),
      seller: new FormControl('')
    });
  }

  updateEntireForm() {
    this.myFormModel.setValue({
      id: 123,
      description: 'A great product',
      seller: 'XYZ Corp'
    });
  }
  updatePartOfTheForm() {
    this.myFormModel.patchValue({
      description: 'The best product'
    });
  }
}
