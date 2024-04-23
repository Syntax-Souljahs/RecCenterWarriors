import { Selector } from 'testcafe';

class WorkoutschedulePagePage {
  constructor() {
    this.pageId = '#workout-schedule-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const workoutschedulePage = new WorkoutschedulePagePage();
