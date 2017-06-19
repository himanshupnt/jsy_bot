import { PlayAppPage } from './app.po';

describe('play-app App', () => {
  let page: PlayAppPage;

  beforeEach(() => {
    page = new PlayAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
