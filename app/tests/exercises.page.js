import { Selector } from 'testcafe';

class ExercisesPage {
  constructor() {
    this.pageId = '#exercises-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addFavorite(testController) {
    await this.isDisplayed(testController);
    await testController.click('#exercises-add-favorite');
    await testController.click('.swal-button');
  }
}

export const exercisesPage = new ExercisesPage();
