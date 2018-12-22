import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  template: `<h1 class="home">Login Component</h1>
  <form #f="ngForm" (ngSubmit)="login(f.value)">
    ID: <input name="id" ngModel/><br>
    PWD: <input type="password" name="pwd" ngModel=""/><br>
    <button type="submit">Login</button>
    <span id="errMessage" *ngIf="wrongCredentials">Invalid ID or password</span>
  </form>
  `
})
export class LoginComponent {
  wrongCredentials = false;
  constructor(private router: Router) {}

  login(formValue) {
    if ('Joe' === formValue.id && 'password' === formValue.pwd) {
      this.router.navigate(['/home']);
      this.wrongCredentials = false;
    } else {
      this.router.navigate(['/login']);
      this.wrongCredentials = true;
    }
  }
}
