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
}

export const exercisesPage = new ExercisesPage();
