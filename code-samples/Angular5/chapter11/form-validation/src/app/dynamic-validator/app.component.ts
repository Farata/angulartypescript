import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="myFormModel">
      Country: <input type="text" formControlName="country">
      <br>
      Phone: <input type="text" formControlName="phone">

      <span class="error" *ngIf="myFormModel.controls['phone'].invalid && myFormModel.controls['phone'].dirty"> 
            Min length: {{this.myFormModel.controls['phone'].getError('minlength')?.requiredLength}}
           </span>
    </form>
  `,
  styles: ['.error {color: red;}']
})
export class AppComponent implements OnInit{
  myFormModel: FormGroup;

  countryCtrl: FormControl;
  phoneCtrl: FormControl;

    constructor(fb: FormBuilder) {
      this.myFormModel = fb.group({
        country: [''],
        phone: ['']
      });
    }

    ngOnInit(){
      this.countryCtrl = this.myFormModel.get('country') as FormControl;
      this.phoneCtrl = this.myFormModel.get('phone') as FormControl;

      this.countryCtrl.valueChanges.subscribe( country => {
          if ('USA' === country){
            this.phoneCtrl.setValidators([Validators.minLength(10)]);
          }else{
            this.phoneCtrl.setValidators([Validators.minLength(11)]);
          }
          this.phoneCtrl.updateValueAndValidity();
        }
      );
    }
}
