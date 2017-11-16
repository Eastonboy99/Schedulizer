import { SchedulizerStandalonePage } from './app.po';

describe('schedulizer-standalone App', () => {
  let page: SchedulizerStandalonePage;

  beforeEach(() => {
    page = new SchedulizerStandalonePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
