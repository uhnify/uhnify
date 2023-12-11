import { Selector } from 'testcafe';
import { eventFinderPage } from './eventfinder.page';

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
    await eventFinderPage.isDisplayed(testController);
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
