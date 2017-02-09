import { MercuryA4Page }        from './app.po';
import { browser, element, by } from 'protractor';

describe('mercury-a4 App', () => {
  let page: MercuryA4Page;

  beforeEach(() => {
    page = new MercuryA4Page();
  });

  it("displays the app title in the toolbar", () => {
    page.navigateTo();
    expect(element(by.css("span#title")).getText()).toEqual("mercury-a4");
  });

  it("displays search md icon in the toolbar", () => {
    page.navigateTo();
    expect(element(by.css("md-icon#search")).getText()).toEqual('search');
  })

  it("navigates to search page if search icon is clicked", () => {
    element(by.css("a")).click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/search");
  })
});
