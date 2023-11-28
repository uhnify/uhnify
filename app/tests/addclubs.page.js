import { Selector } from 'testcafe';

class AddClubsPage {
  constructor() {
    this.pageId = '#add-clubs';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addClub(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#name', 'testclub');
    await testController.typeText('#image', 'img');
    await testController.typeText('#location', 'UH');
    await testController.typeText('#description', 'testing');
    await testController.typeText('#meetingTime', '7:30');
    await testController.click('#submit');
    // await navBar.isLoggedIn(testController, username);
  }
}

export const addClubPage = new AddClubsPage();
