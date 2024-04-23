import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SignupPage {
  constructor() {
    this.pageId = '#signup-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(testController, username, firstName, lastName, year, major, email, interests, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#signup-form-username', username);
    await testController.typeText('#signup-form-firstName', firstName);
    await testController.typeText('#signup-form-lastName', lastName);

    // Select year from dropdown
    await testController.click('#signup-form-year'); // Click to open the dropdown
    await testController.click(Selector('#signup-form-year').find('option').withText(year)); // Select the year

    await testController.typeText('#signup-form-major', major);
    await testController.typeText('#signup-form-email', email);
    await testController.typeText('#signup-form-password', password);

    // Select interests from dropdown
    await testController.click('#signup-form-interests'); // Click to open the dropdown
    await testController.click(Selector('#signup-form-interests').find('option').withText(interests)); // Select the interests

    await testController.click('#signup-form-submit input.btn.btn-primary');
    await navBar.isLoggedIn(testController, username);
  }
}

export const signupPage = new SignupPage();
