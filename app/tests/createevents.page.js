import { Selector } from 'testcafe';

class CreateEventsPage {
  constructor() {
    this.pageId = '#add-events';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addEvent(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#title', 'testevent');
    await testController.typeText('#eventID', '1234');
    await testController.typeText('#image', 'img');
    await testController.typeText('#location', 'UH');
    await testController.typeText('#description', 'testing');
    await testController.typeText('#date', '1210343430341pm');
    await testController.typeText('#createdBy', 'testcafe');
    await testController.click('#submit');
    // await navBar.isLoggedIn(testController, username);
  }
}

export const createEventsPage = new CreateEventsPage();
