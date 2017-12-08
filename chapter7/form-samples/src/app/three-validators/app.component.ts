import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f.value)" >
      <div>
        Phone number:
        <input type="text" name="telephone" ngModel
               required
               pattern="[0-9]*"
               minlength="10"
               #phone="ngModel"
               [class.hasError]="phone.invalid && phone.touched">
        <div [hidden]="phone.valid || phone.pristine">
          <div class="error" [hidden]="!phone.hasError('minlength')">Phone has to have at least 10 digits</div>
          <div class="error" [hidden]="!phone.hasError('required')">Phone is required</div>
          <div class="error" [hidden]="!phone.hasError('pattern')">Only digits are allowed</div>
        </div>

      </div>
      <button type="submit" 
              [disabled]="f.invalid">Submit</button>
    </form>
  `,
  styles: ['.error {color: red;} .hasError {border: 1px solid red;}']
})
export class AppComponent {
  onSubmit(formData) {
    console.log(formData);
  }
}
