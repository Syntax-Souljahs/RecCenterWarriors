import { Selector } from 'testcafe';

class ViewprofilePage {
  constructor() {
    this.pageId = '#view-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const viewprofilePage = new ViewprofilePage();
