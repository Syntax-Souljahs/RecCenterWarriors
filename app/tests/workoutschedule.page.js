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

  async submitWorkoutSchedule(testController, mondayWorkout, tuesdayWorkout, wednesdayWorkout, thursdayWorkout, fridayWorkout, saturdayWorkout, sundayWorkout) {
    await this.isDisplayed(testController);
    await testController.click('#workout-mondayWorkout');
    await testController.click(Selector('#workout-mondayWorkout').find('option').withText(mondayWorkout));

    await testController.click('#workout-tuesdayWorkout');
    await testController.click(Selector('#workout-tuesdayWorkout').find('option').withText(tuesdayWorkout));

    await testController.click('#workout-wednesdayWorkout');
    await testController.click(Selector('#workout-wednesdayWorkout').find('option').withText(wednesdayWorkout));

    await testController.click('#workout-thursdayWorkout');
    await testController.click(Selector('#workout-thursdayWorkout').find('option').withText(thursdayWorkout));

    await testController.click('#workout-fridayWorkout');
    await testController.click(Selector('#workout-fridayWorkout').find('option').withText(fridayWorkout));

    await testController.click('#workout-saturdayWorkout');
    await testController.click(Selector('#workout-saturdayWorkout').find('option').withText(saturdayWorkout));

    await testController.click('#workout-sundayWorkout');
    await testController.click(Selector('#workout-sundayWorkout').find('option').withText(sundayWorkout));

    await testController.click('#workout-submit input.btn.btn-primary');
    await testController.click('.swal-button');
  }
}

export const workoutschedulePage = new WorkoutschedulePagePage();
