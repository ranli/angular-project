import { ImagepostPage } from './app.po';

describe('imagepost App', function() {
  let page: ImagepostPage;

  beforeEach(() => {
    page = new ImagepostPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
