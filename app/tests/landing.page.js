import { Selector } from 'testcafe';

class LandingPage {
  constructor() {
    this.pageId = '#landing-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async eventCard(testController) {
    await this.isDisplayed(testController);
    await testController.click('#link-event-card');
  }

  async browseClubCard(testController) {
    await this.isDisplayed(testController);
    await testController.click('#browse-club-card');
  }

  async myClubCard(testController) {
    await this.isDisplayed(testController);
    await testController.click('#my-club-card');
  }
}

export const landingPage = new LandingPage();
