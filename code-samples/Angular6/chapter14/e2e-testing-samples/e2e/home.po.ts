import { by, element } from 'protractor';

export class HomePage {

  getHeaderText() {
    return element(by.css('h1')).getText();
  }
}
