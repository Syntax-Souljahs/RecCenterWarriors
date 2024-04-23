import { Selector } from 'testcafe';

class BuddyupPage {
  constructor() {
    this.pageId = '#buddy-up-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const buddyupPage = new BuddyupPage();
