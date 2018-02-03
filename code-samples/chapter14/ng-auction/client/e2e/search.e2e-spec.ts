import { SearchPage } from './search.po';
import {browser} from 'protractor';

describe('ngAuction search', () => {
  let searchPage: SearchPage;

  beforeEach(() => {
    searchPage = new SearchPage();
  });

  it('should perform the search for products that cost from $10 to $100',  () => {
    searchPage.navigateToLandingPage();
    let url =  browser.getCurrentUrl();
    expect(url).toContain('/categories/all');

    searchPage.performSearch(10, 100);
    url =  browser.getCurrentUrl();
    expect(url).toContain('/search?minPrice=10&maxPrice=100');

    const firstProductPrice = searchPage.getFirstProductPrice();
    expect(firstProductPrice).toBeGreaterThan(10);
    expect(firstProductPrice).toBeLessThan(100);
  });
});






/*
import { SearchPage } from './search.po';
import {browser} from 'protractor';

describe('Landing page', () => {
  let searchPage: SearchPage;

  beforeEach(() => {
    searchPage = new SearchPage();
    browser.waitForAngularEnabled(false);
  });

  it('should navigate to landing page and open the search panel', async () => {
    await searchPage.navigateToLanding();
    let url = await browser.getCurrentUrl();
    console.log('url1: ' + url);
    expect(url).toContain('/categories/all');

    await searchPage.performSearch();
    url = await browser.getCurrentUrl();
    console.log('url2: ' + url);
    expect(url).toContain('/search');
  });
});
*/
