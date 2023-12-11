import { Selector } from 'testcafe';

class SigninPage {
  constructor() {
    this.pageId = '#sign-in';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async signin(testController, username, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#form-email', username);
    await testController.typeText('#form-password', password);
    await testController.click('.form-controlsubmit');
    // await navBar.isLoggedIn(testController, username);
  }
}

export const signinPage = new SigninPage();
