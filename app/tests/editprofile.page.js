import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#edit-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editUser(testController, firstName, lastName, year, major, interests) {
    await this.isDisplayed(testController);
    await testController.typeText('#edit-form-firstName', firstName, { replace: true });
    await testController.typeText('#edit-form-lastName', lastName, { replace: true });

    // Select year from dropdown
    await testController.click('#edit-form-year'); // Click to open the dropdown
    await testController.click(Selector('#edit-form-year').find('option').withText(year)); // Select the year

    await testController.typeText('#edit-form-major', major, { replace: true });

    // Select interests from dropdown
    await testController.click('#edit-form-interests'); // Click to open the dropdown
    await testController.click(Selector('#edit-form-interests').find('option').withText(interests)); // Select the interests
    await testController.click('#edit-form-submit input.btn.btn-primary');
    // Click the sweet alert
    await testController.click('.swal-button');
  }
}

export const editprofilePage = new EditProfilePage();
