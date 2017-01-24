import { MercuryA4Page } from './app.po';

describe('mercury-a4 App', function() {
  let page: MercuryA4Page;

  beforeEach(() => {
    page = new MercuryA4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
