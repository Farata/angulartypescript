import { protractor, browser, by, element, $, $$ } from 'protractor';

export class SearchPage {

  performSearch(minimalPrice: number, maximumPrice: number) {
     const searchOnToolbar = element(by.id('search'));
     searchOnToolbar.click();

     const minPrice = $('input[formControlName="minPrice"]');
     const maxPrice = $('input[formControlName="maxPrice"]');
     minPrice.sendKeys(minimalPrice);
     maxPrice.sendKeys(maximumPrice);

     const searchOnForm = element(by.buttonText('SEARCH'));
     searchOnForm.click();
     // this.waitForUrlTocontain('/search', 5000,
     //               'The URL should contain "/search"');

    const EC = protractor.ExpectedConditions;
    const urlChanged = EC.urlContains('/search');
    browser.wait(urlChanged, 5000, 'The URL should contain /search');

  }

   navigateToLandingPage() {
    return browser.get('/');
  }

  getFirstProductPrice() {
    // browser.waitForAngular();  // workaround for the random locator error
    return $$('span[class="tile__price-tag"]')
      .first().getText()
      .then((value) => {return parseInt(value.replace('$', ''), 10); } );
  }


// Another way to implement the wait (not used)

waitForUrlTocontain (urlSegment: string, timeout: number,
                       timeoutMessage: string) {
    return browser.wait(() => {
      return browser.getCurrentUrl().then((url) => {
        const regex = new RegExp(urlSegment);
        return regex.test(url);
      });
    }, timeout, timeoutMessage);
  }

}







/*
import { browser, by, element } from 'protractor';

export class SearchPage {

  search = element(by.id('search'));

  async performSearch() {

    await this.search.click();
    browser.sleep(3000);
  }

  async navigateToLanding() {
    return await browser.get('/');
  }
}*/
