import { browser, by, element } from 'protractor';

export class LoginPage {

  id = element(by.css('input[name="id"]'));
  pwd = element(by.css('input[name="pwd"]'));
  submit = element(by.buttonText('Login'));
  errMessage = element(by.id('errMessage'));

  login(id: string, password: string): void {
    this.id.sendKeys(id);
    this.pwd.sendKeys(password);
    this.submit.click();
  }
  navigateToLogin() {
    return browser.get('/login');
  }

  getErrorMessage() {
    return this.errMessage;
  }
}
