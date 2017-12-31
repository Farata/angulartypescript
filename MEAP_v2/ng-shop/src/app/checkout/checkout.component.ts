import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngs-checkout',
  styleUrls: [ './checkout.component.scss' ],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {

  readonly months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  readonly years: number[];

  readonly formModel: FormGroup;

  constructor(fb: FormBuilder) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({length: 10}, (_, index) => currentYear + index);

    this.formModel = fb.group({
      account: fb.group({
        email: [, [Validators.required, Validators.email]],
        phone: [, Validators.required]
      }),
      address: fb.group({
        line1  : [, Validators.required],
        city   : [, Validators.required],
        state  : [, Validators.required],
        zip    : [, Validators.required],
        country: [, Validators.required]
      }),
      payment: fb.group({
        cardholder: [, Validators.required],
        cardNumber: [, Validators.required],
        expiry: fb.group({
          month: [, Validators.required],
          year : [, Validators.required],
          cvv  : [, Validators.required]
        })
      })
    });
  }

  hasError(errorCode: string, path: string[]) {
    return this.formModel.get(path).touched
      && this.formModel.hasError(errorCode, path);
  }

  placeOrder() {
    console.log(this.formModel.value);
  }
}
