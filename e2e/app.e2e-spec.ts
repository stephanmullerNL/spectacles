import { BinocularsPage } from './app.po';

describe('binoculars App', () => {
  let page: BinocularsPage;

  beforeEach(() => {
    page = new BinocularsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
