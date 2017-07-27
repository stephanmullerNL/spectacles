import { CreeprPage } from './app.po';

describe('creepr App', () => {
  let page: CreeprPage;

  beforeEach(() => {
    page = new CreeprPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
