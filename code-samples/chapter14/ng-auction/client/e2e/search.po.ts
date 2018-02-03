import { browser, by, element } from 'protractor';

export class SearchPage {

  performSearch(minimalPrice: number, maximumPrice: number) {
     const searchOnToolbar = element(by.id('search'));
     searchOnToolbar.click();

     const minPrice = element(by.css('input[formControlName="minPrice"]'));
     const maxPrice = element(by.css('input[formControlName="maxPrice"]'));
     minPrice.sendKeys(minimalPrice);
     maxPrice.sendKeys(maximumPrice);

     const searchOnForm = element(by.buttonText('SEARCH'));
     searchOnForm.click();
     browser.waitForAngular();
  }

   navigateToLanding() {
    return browser.get('/');
  }

  getFirstProductPrice() {
    return element.all(by.css('span[class="tile__price-tag"]'))
      .first().getText()
      .then((value) => {return parseInt(value.replace('$', ''), 10); } );
  }

/*  getFirstProductPrice() {
    const firstProductPrice = element.all(by.css('span[class="tile__price-tag"]'))
                              .first().getText();
    return firstProductPrice;
  }*/
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
