import { browser, element, by } from 'protractor';

export class EditPage {
  navigateTo(link: string) {
    return browser.get(link);
  }

  getElemContent(id: string) {
    return element(by.id(`${id}`)).getText();
  }
}
