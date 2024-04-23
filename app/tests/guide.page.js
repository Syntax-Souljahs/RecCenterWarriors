import { Selector } from 'testcafe';

class GuidePage {
  constructor() {
    this.pageId = '#guide-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const guidePage = new GuidePage();
