import { browser, element, by } from 'protractor';

export class SearchPage {
  navigateTo() {
    return browser.get("/search");
  }

  getElemContent(id: string) {
    return element(by.id(`${id}`)).getText();
  }

}
