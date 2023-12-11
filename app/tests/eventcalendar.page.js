import { Selector } from 'testcafe';

class EventCalendarPage {
  constructor() {
    this.pageId = '#event-calendar';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const eventCalendarPage = new EventCalendarPage();
