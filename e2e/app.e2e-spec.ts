import { SpectaclesPage } from './app.po';

describe('spectacles App', () => {
  let page: SpectaclesPage;

  beforeEach(() => {
    page = new SpectaclesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
