import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSignInPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#nav-dropdown-profile');
    await testController.click('#nav-dropdown-profile-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#nav-dropdown-profile');
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql('Logout');
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#nav-dropdown-profile');
    await testController.click('#navbar-current-user');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignUpPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  async gotoBrowseClubsPage(testController) {
    await testController.click('#club-drop');
    await testController.click('#browse-clubs');
  }

  async gotoMyClubsPage(testController) {
    await testController.click('#club-drop');
    await testController.click('#my-clubs');
  }

  async gotoMyEventsPage(testController) {
    await testController.click('#nav-dropdown-events');
    await testController.click('#my-events');
  }

  async gotoAddClubsPage(testController) {
    await testController.click('#club-drop');
    await testController.click('#add-clubs');
  }
}

export const navBar = new NavBar();
