import { Selector } from 'testcafe';

class MyEventsPage {
  constructor() {
    this.pageId = '#list-events-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const myEventsPage = new MyEventsPage();
