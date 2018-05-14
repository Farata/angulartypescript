import { LoginPage } from './login.po';
import { HomePage } from './home.po';
import {browser} from 'protractor';

describe('Login page', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  beforeEach(() => {
    loginPage = new LoginPage();
  });

  it('should navigate to login page and log in', () => {
    loginPage.navigateToLogin();
    loginPage.login('Joe', 'password');

    const url = browser.getCurrentUrl();
    expect(url).toContain('/home');

    homePage = new HomePage();
    expect(homePage.getHeaderText()).toEqual('Home Component');
  });

  it('should stay on login page if wrong credentials entered', () => {
    loginPage.navigateToLogin();
    loginPage.login('Joe', 'wrongpassword');

    const url = browser.getCurrentUrl();
    expect(url).toContain('/login');
    expect(loginPage.getErrorMessage().isPresent()).toBe(true);

  });
});
