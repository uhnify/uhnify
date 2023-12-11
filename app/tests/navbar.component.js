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
  async isLoggedIn(testController) {
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

  //  check that browse clubs page link works
  async gotoBrowseClubsPage(testController) {
    await testController.click('#club-drop');
    await testController.click('#browse-clubs');
  }

  // check that my clubs page link works
  async gotoMyClubsPage(testController) {
    await testController.click('#club-drop');
    await testController.click('#my-clubs');
  }

  // check that event finder page link works
  async gotoEventFinderPage(testController) {
    await testController.click('#nav-dropdown-events');
    await testController.click('#event-finder');
  }

  // check that add clubs page link works
  async gotoAddClubsPage(testController) {
    await testController.click('#club-drop');
    await testController.click('#add-clubs');
  }

  // check that event calendar page link works
  async gotoEventCalendarPage(testController) {
    await testController.click('#nav-dropdown-events');
    await testController.click('#event-calendar');
  }

  // check that create events page link works
  async gotoCreateEventsPage(testController) {
    await testController.click('#nav-dropdown-events');
    await testController.click('#create-event');
  }

  // check that my events page link works
  async gotoMyEventsPage(testController) {
    await testController.click('#nav-dropdown-events');
    await testController.click('#my-events');
  }

  // check that my profile page link works
  async gotoProfilePage(testController) {
    await testController.click('#nav-dropdown-profile');
    await testController.click('#profile');
  }

  // check that my events page link works
  async gotoMyNavClubsPage(testController) {
    await testController.click('#nav-dropdown-profile');
    await testController.click('#nav-my-clubs');
  }

  // check that my events page link works
  async gotoAgendaPage(testController) {
    await testController.click('#nav-dropdown-profile');
    await testController.click('#nav-calendar-events');
  }

  // check that my events page link works
  async gotoCustomizePage(testController) {
    await testController.click('#nav-dropdown-profile');
    await testController.click('#nav-customize');
  }
}

export const navBar = new NavBar();
