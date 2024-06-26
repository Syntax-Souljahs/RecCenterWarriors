import { Selector } from 'testcafe';

class FavoritesPage {
  constructor() {
    this.pageId = '#favorites-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async removeFavorite(testController) {
    await this.isDisplayed(testController);
    await testController.click('#remove-favorite');
    await testController.click('.swal-button');
  }
}

export const favoritesPage = new FavoritesPage();
